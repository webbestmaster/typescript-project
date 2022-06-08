import fileSystem, {ReadStream} from 'fs';
import path from 'path';

import {FastifyReply, FastifyRequest} from 'fastify';

import {PromiseResolveType} from '../../www/util/promise';
import {getRandomString} from '../../www/util/string';
import {getStringFromUnknown} from '../../www/util/type';

import {uploadFolder} from './file-const';
import {UploadFileResponseType} from './file-type';

export async function uploadFile(request: FastifyRequest, reply: FastifyReply): Promise<void> {
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

export function getFile(request: FastifyRequest<{Params: {fileName?: string}}>, reply: FastifyReply): ReadStream {
    const {params} = request;
    const fileName = getStringFromUnknown(params, 'fileName');

    reply.header('x-warning-get-file', 'need-use-nginx');

    return fileSystem.createReadStream(path.join(uploadFolder, fileName));
}
