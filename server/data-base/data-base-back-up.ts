import fileSystem, {promises as fileSystemPromises} from 'fs';
import path from 'path';

import JSZip from 'jszip';

import {sortStringCallbackReverse} from '../../www/util/string';

import {dataBaseBackUpPathAbsolute} from './data-base-const';
import {CrudConfigOnChangeArgumentType} from './data-base-type';

async function removeOldDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType) {
    const {dataBaseId} = dataBaseInfo;

    const maxBackUpCount = 100;

    const fileList: Array<string> = await fileSystemPromises.readdir(path.join(dataBaseBackUpPathAbsolute, dataBaseId));

    // new files at first
    const sortedFileNameList = fileList.sort(sortStringCallbackReverse);

    // all files after maxBackUpCount
    const extraFileNameList = sortedFileNameList.slice(maxBackUpCount);

    extraFileNameList.forEach((fileNameToRemove: string) => {
        const pathToFile = path.join(dataBaseBackUpPathAbsolute, dataBaseId, fileNameToRemove);

        fileSystemPromises.unlink(pathToFile).catch((error: Error) => {
            console.log('[ERROR]: removeOldDataBaseBackUp:', error.message);
        });
    });
}

export function makeDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType) {
    removeOldDataBaseBackUp(dataBaseInfo);

    const {dataBaseFileName, dataBasePath, dataBaseId} = dataBaseInfo;
    const zip = new JSZip();
    const fileNamePrefix = new Date().toISOString().replace(/[:tz]+/gi, '-');
    const newFileName = path.join(dataBaseBackUpPathAbsolute, dataBaseId, `${fileNamePrefix}${dataBaseFileName}.zip`);

    zip.file(dataBaseFileName, fileSystem.createReadStream(dataBasePath))
        .generateNodeStream({compression: 'DEFLATE', streamFiles: true})
        .pipe(fileSystem.createWriteStream(newFileName));
}
