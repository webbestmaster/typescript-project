import fileSystem, {ReadStream, promises as fileSystemPromises, Stats} from 'fs';
import path from 'path';

import {FastifyReply, FastifyRequest} from 'fastify';
import webpConverter from 'webp-converter';

import {PromiseResolveType} from '../../www/util/promise';
import {getRandomString} from '../../www/util/string';
import {getStringFromUnknown} from '../../www/util/type';
import {getFileExtension, getIsImage} from '../../www/page/cms/cms-article/cms-article-helper';

import {uploadFolder} from './file-const';
import {UploadFileResponseType} from './file-type';

// eslint-disable-next-line max-statements
export async function uploadFile(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const uploadFileLimit = 75e6; // 75MB

    const {filename, file} = await request.file({
        limits: {fileSize: uploadFileLimit, files: 1},
    });

    const rawFileExtension = getFileExtension(filename);
    const hasExtension = rawFileExtension !== filename;
    const fileExtension = hasExtension ? `.${rawFileExtension}` : '';

    const uniqueFileName = `${getRandomString()}${fileExtension}`;
    const fullFilePath = path.join(uploadFolder, uniqueFileName);

    await new Promise((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        const writeStream = fileSystem.createWriteStream(fullFilePath);

        file.pipe(writeStream).on('close', resolve).on('error', reject);
    });

    const stats: Stats = await fileSystemPromises.stat(fullFilePath);

    if (stats.size >= uploadFileLimit) {
        await fileSystemPromises.unlink(fullFilePath);

        throw new Error('File too big, limit 75MB');
    }

    const uploadResponse: UploadFileResponseType = {uniqueFileName};

    if (!getIsImage(uniqueFileName)) {
        console.info(uploadResponse);
        reply.code(200).send(uploadResponse);
        return;
    }

    const webPFileName = `${getRandomString()}.webp`;

    await webpConverter.cwebp(fullFilePath, path.join(uploadFolder, webPFileName), '-q 80 -m 6', '-v');

    await fileSystemPromises.unlink(fullFilePath);

    const uploadResponseWebP: UploadFileResponseType = {uniqueFileName: webPFileName};

    reply.code(200).send(uploadResponseWebP);
}

export function getFile(request: FastifyRequest<{Params: {fileName?: string}}>, reply: FastifyReply): ReadStream {
    const {params} = request;
    const fileName = getStringFromUnknown(params, 'fileName');

    reply.header('x-warning-get-file', 'need-use-nginx');

    return fileSystem.createReadStream(path.join(uploadFolder, fileName));
}
