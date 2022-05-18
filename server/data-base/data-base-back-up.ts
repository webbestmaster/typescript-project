/* global process */

import fileSystem from 'fs';
import path from 'path';

import JSZip from 'jszip';

import {sortXCallbackReverse} from '../../www/util/string';

import {dataBaseBackUpFolderPath} from './data-base-const';
import {CrudConfigOnChangeArgumentType} from './data-base-type';

const cwd = process.cwd();

const backUpFolderPath = path.join(cwd, dataBaseBackUpFolderPath);

function removeOldDataBaseBackUp() {
    const maxBackUpCount = 100;

    fileSystem.readdir(backUpFolderPath, (error: Error | null, fileList: Array<string>) => {
        if (error) {
            console.log('[ERROR]: removeOldDataBaseBackUp: unable to read directory: ' + error.message);
            return;
        }

        // new files at first
        const sortedFileNameList = fileList.sort(sortXCallbackReverse);

        // all files after maxBackUpCount
        const extraFileNameList = sortedFileNameList.slice(maxBackUpCount);

        extraFileNameList.forEach((fileNameToRemove: string) => {
            const pathToFile = path.join(backUpFolderPath, fileNameToRemove);

            fileSystem.unlink(pathToFile, (errorForRemove: Error | null) => {
                if (!errorForRemove) {
                    return;
                }
                console.log('[ERROR]: removeOldDataBaseBackUp: can not remove file: ' + errorForRemove.message);
            });
        });
    });
}

export function makeDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType) {
    removeOldDataBaseBackUp();

    const {dataBaseFileName, dataBasePath} = dataBaseInfo;
    const zip = new JSZip();
    const fileNamePrefix = new Date().toISOString().replace(/\.\S+/, '').replace(/:+/g, '-');

    const newFileName = path.join(backUpFolderPath, `${fileNamePrefix}-${dataBaseFileName}.zip`);

    zip.file(dataBaseFileName, fileSystem.createReadStream(dataBasePath))
        .generateNodeStream({compression: 'DEFLATE', streamFiles: true})
        .pipe(fileSystem.createWriteStream(newFileName));
}
