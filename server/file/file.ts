import fileSystem from 'fs';
import path from 'path';

import {FastifyReply, FastifyRequest} from 'fastify';

import {PromiseResolveType} from '../../www/util/promise';
import {getIsNotAdmin} from '../auth/auth-helper';
import {mainResponseHeader} from '../const';

import {uploadFolder} from './file-const';
import {UploadFileResponseType} from './file-type';

export async function uploadFile(request: FastifyRequest<{Body: string}>, reply: FastifyReply): Promise<void> {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const {session, query} = request;

    if (await getIsNotAdmin(request)) {
        reply
            .code(403)
            .header(...mainResponseHeader)
            .send(null);
        return;
    }

    const uploadFileLimit = 75e6; // 75MB

    const {filename, file} = await request.file({
        limits: {fileSize: uploadFileLimit, files: 1},
    });

    const uniqueFileName = Date.now() + '---' + filename;
    const fullFilePath = path.join(uploadFolder, uniqueFileName);

    await new Promise((resolve: PromiseResolveType<void>, reject: PromiseResolveType<string>) => {
        const writeStream = fileSystem.createWriteStream(fullFilePath);

        file.pipe(writeStream)
            .on('close', () => {
                if (file.bytesRead >= uploadFileLimit) {
                    fileSystem.unlink(fullFilePath, () => {
                        console.info('Too big file. Deleted.');
                    });
                    reject('Too big file');
                    return;
                }
                resolve();
            })
            .on('error', reject);
    });

    const uploadResponse: UploadFileResponseType = {uniqueFileName};

    reply.code(200).send(uploadResponse);
}
