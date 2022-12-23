import fileSystem, {promises as fileSystemPromises} from 'fs';
import path from 'path';

import JSZip from 'jszip';

import {sortStringCallbackReverse} from '../../www/util/string';
import {PromiseResolveType} from '../../www/util/promise';

import {dataBaseBackUpPathAbsolute} from './data-base-const';
import {CrudConfigOnChangeArgumentType} from './data-base-type';

async function removeOldDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType): Promise<void> {
    const {dataBaseId} = dataBaseInfo;

    const maxBackUpCount = 100;

    const fileList: Array<string> = await fileSystemPromises.readdir(path.join(dataBaseBackUpPathAbsolute, dataBaseId));

    // new files at first
    const sortedFileNameList = fileList.sort(sortStringCallbackReverse);

    // all files after maxBackUpCount
    const extraFileNameList = sortedFileNameList.slice(maxBackUpCount);

    await Promise.all(
        extraFileNameList.map((fileNameToRemove: string): Promise<void> => {
            const pathToFile = path.join(dataBaseBackUpPathAbsolute, dataBaseId, fileNameToRemove);

            return fileSystemPromises.unlink(pathToFile);
        })
    ).catch((error: Error): void => {
        console.log('[ERROR]: removeOldDataBaseBackUp:', error.message);
    });
}

export async function makeDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType): Promise<void> {
    await removeOldDataBaseBackUp(dataBaseInfo);

    const {dataBaseFileName, dataBasePath, dataBaseId} = dataBaseInfo;
    const zip = new JSZip();
    const fileNamePrefix = new Date().toISOString().replace(/[:tz]+/gi, '-');
    const newFileName = path.join(dataBaseBackUpPathAbsolute, dataBaseId, `${fileNamePrefix}${dataBaseFileName}.zip`);

    await new Promise((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        zip.file(dataBaseFileName, fileSystem.createReadStream(dataBasePath))
            .generateNodeStream({compression: 'DEFLATE', streamFiles: true})
            .pipe(fileSystem.createWriteStream(newFileName))
            .on('close', resolve)
            .on('error', reject);
    });

    console.info(`[ OK ]: makeDataBaseBackUp - done, data base id: ${dataBaseId}`);
}
