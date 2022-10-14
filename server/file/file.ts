import fileSystem, {ReadStream, promises as fileSystemPromises, Stats} from 'fs';
import path from 'path';

// import sharp from 'sharp';
import {FastifyReply, FastifyRequest} from 'fastify';
import {MultipartFile} from '@fastify/multipart';
import webpConverter from 'webp-converter';

import {PromiseResolveType} from '../../www/util/promise';
import {getRandomString} from '../../www/util/string';
import {getStringFromUnknown} from '../../www/util/type';
import {getFileExtension, getIsImage} from '../../www/page/cms/cms-article/cms-article-helper';

import {temporaryUploadFolder, uploadFolder} from './file-const';
import {UploadFileResponseType} from './file-type';

// eslint-disable-next-line max-statements
export async function uploadFile(request: FastifyRequest): Promise<UploadFileResponseType> {
    const uploadFileLimit = 75e6; // 75MB

    const fileData: MultipartFile | void = await request.file({
        limits: {fileSize: uploadFileLimit, files: 1},
    });

    if (!fileData) {
        throw new Error('[uploadFile]: Can not get file');
    }

    const {filename, file} = fileData;

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
        return uploadResponse;
    }

    const webPFileName = `${getRandomString()}.webp`;

    await webpConverter.cwebp(fullFilePath, path.join(uploadFolder, webPFileName), '-q 80 -m 6', '-v');

    await fileSystemPromises.unlink(fullFilePath);

    const uploadResponseWebP: UploadFileResponseType = {uniqueFileName: webPFileName};

    return uploadResponseWebP;
}

export function getFile(request: FastifyRequest<{Params: {fileName?: string}}>, reply: FastifyReply): ReadStream {
    const {params} = request;
    const fileName = getStringFromUnknown(params, 'fileName');

    reply.header('x-warning-get-file', 'need-use-nginx');

    return fileSystem.createReadStream(path.join(uploadFolder, fileName));
}

let getImageCount = 0;

export async function getImage(
    request: FastifyRequest<{Params: {fileName?: string}}>,
    reply: FastifyReply
): Promise<ReadStream> {
    const {params} = request;
    const fileName = getStringFromUnknown(params, 'fileName');
    const size = getStringFromUnknown(params, 'size');

    reply.header('x-warning-get-file', 'need-use-nginx');

    const rawFileExtension = getFileExtension(fileName);
    const fullFilePath = path.join(uploadFolder, fileName);

    // console.info('getImage /////////////');
    // console.info(fileName);
    // console.info(rawFileExtension);
    // console.info(fullFilePath);
    // console.info(path.join(uploadFolder, '___' + fileName));
    // console.info(size);

    getImageCount = (getImageCount + 1) % 1000;

    const newFileName: string = 'remove-me-' + getImageCount.toString(10).padStart(3, '0');
    const temporaryFilePath: string = path.join(temporaryUploadFolder, `${newFileName}.${rawFileExtension}`);

    const [rawImageWidth, rawImageHeight] = size.split('x');
    const imageWidth: number = Number.parseInt(rawImageWidth, 10) || 0;
    const imageHeight: number = Number.parseInt(rawImageHeight, 10) || 0;

    if (rawFileExtension === 'webp') {
        await webpConverter.cwebp(
            fullFilePath,
            temporaryFilePath,
            `-q 80 -m 6 -resize ${imageWidth.toString(10)} ${imageHeight.toString(10)}`,
            '-v'
        );

        return fileSystem.createReadStream(temporaryFilePath);
    }

    if (rawFileExtension === 'png') {
        // await sharp(fullFilePath).resize(imageWidth, imageHeight).toFile(temporaryFilePath);
        // return fileSystem.createReadStream(temporaryFilePath);
        return getFile(request, reply);
    }

    return getFile(request, reply);
}
