import fileSystem from 'fs';
import path from 'path';

import {FastifyReply, FastifyRequest} from 'fastify';

import {PromiseResolveType} from '../../www/util/promise';
import {getRandomString} from '../../www/util/string';

import {uploadFolder} from './file-const';
import {UploadFileResponseType} from './file-type';

export async function uploadFile(request: FastifyRequest<{Body: string}>, reply: FastifyReply): Promise<void> {
    const uploadFileLimit = 75e6; // 75MB

    const {filename, file} = await request.file({
        limits: {fileSize: uploadFileLimit, files: 1},
    });

    const rawFileExtension = filename.split('.').pop();
    const hasExtension = rawFileExtension !== filename;
    const fileExtension = hasExtension ? `.${rawFileExtension}` : '';

    const uniqueFileName = `${getRandomString()}${fileExtension}`;
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

export async function getFile(
    request: FastifyRequest<{Body: string; Params: {fileName: string}}>,
    reply: FastifyReply
): Promise<void> {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const {params} = request;
    const {fileName} = params;

    const stream = fileSystem.createReadStream(path.join(uploadFolder, fileName));

    reply.code(200).send(stream);
}
