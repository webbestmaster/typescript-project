import fileSystem, {promises as fileSystemPromises, ReadStream, Stats} from 'fs';
import path from 'path';

// import sharp from 'sharp';
import {FastifyReply, FastifyRequest} from 'fastify';
import {MultipartFile} from '@fastify/multipart';
import webpConverter from 'webp-converter';

import {PromiseResolveType} from '../../www/util/promise';
import {getRandomString} from '../../www/util/string';
import {getStringFromUnknown} from '../../www/util/type';
import {getFileExtension, getIsAudio, getIsImage} from '../../www/page/cms/cms-article/cms-article-helper';
import {ArticleFileType, ArticleFileTypeEnum} from '../article/article-type';
import {fileSizeLimit} from '../../www/page/cms/cms-article/cms-article-const';

import {temporaryUploadFolder, uploadFolder} from './file-const';
import {makeAudioFile} from './file-audio';

// eslint-disable-next-line max-statements, complexity
export async function uploadFile(request: FastifyRequest): Promise<ArticleFileType> {
    const fileData: MultipartFile | void = await request.file({
        limits: {fileSize: fileSizeLimit, files: 1},
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

    if (stats.size >= fileSizeLimit) {
        // remove original file
        await fileSystemPromises.unlink(fullFilePath);

        throw new Error('File too big, limit 75MB');
    }

    const uploadResponse: ArticleFileType = {
        duration: 0,
        height: 0,
        name: uniqueFileName,
        size: stats.size,
        type: ArticleFileTypeEnum.unknown,
        width: 0,
    };

    if (getIsImage(uniqueFileName)) {
        const webPFileName = `${getRandomString()}.webp`;
        const webPFilePath = path.join(uploadFolder, webPFileName);

        await webpConverter.cwebp(fullFilePath, webPFilePath, '-q 80 -m 6', '-v');

        const webPStats: Stats = await fileSystemPromises.stat(webPFilePath);

        // remove original file
        await fileSystemPromises.unlink(fullFilePath);

        const uploadResponseWebP: ArticleFileType = {
            duration: 0,
            height: 0,
            name: webPFileName,
            size: webPStats.size,
            type: ArticleFileTypeEnum.image,
            width: 0,
        };

        return uploadResponseWebP;
    }

    if (getIsAudio(uniqueFileName)) {
        const mp3FileName = await makeAudioFile(fullFilePath);
        const mp3FilePath = path.join(uploadFolder, mp3FileName);
        const mp3Stats: Stats = await fileSystemPromises.stat(mp3FilePath);

        // remove original file
        await fileSystemPromises.unlink(fullFilePath);

        const uploadResponseAudio: ArticleFileType = {
            duration: 0,
            height: 0,
            name: mp3FileName,
            size: mp3Stats.size,
            type: ArticleFileTypeEnum.audio,
            width: 0,
        };

        return uploadResponseAudio;
    }

    return uploadResponse;
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
    // https://developers.google.com/speed/webp/docs/cwebp, 0 -> means auto
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
