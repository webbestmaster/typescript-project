/*
import {exec} from 'child_process';
import fileSystem from 'fs';
import path from 'path';

import {PromiseResolveType} from "../../www/util/promise";
*/

console.log('here data base back up');

/*
export async function makeDataBaseBackUp(): Promise<null | Error> {
    return new Promise((resolve: PromiseResolveType<null | Error>) => {
        exec(dataBaseConst.shallCommand.backup, (error: ?Error, stdout: string | Buffer, stderr: string | Buffer) => {
            if (isError(error)) {
                console.log('---> Error:', stderr);
                resolve(error);
                return;
            }

            console.log(stdout);

            removeOldDataBaseBackUp();

            resolve(null);
        });
    });
}

export function removeOldDataBaseBackUp() {
    const maxBackUpCount = 100;

    fileSystem.readdir(databaseDumpFolderName, (error: ?Error, fileList: Array<string>) => {
        if (isError(error)) {
            console.log('removeOldDataBaseBackUp: unable to scan directory: ' + error.message);
            return;
        }

        // new files at first
        const sortedFileNameList = fileList.sort(sortXCallbackReverse);

        // all files after maxBackUpCount
        const extraFileNameList = sortedFileNameList.slice(maxBackUpCount);

        extraFileNameList.forEach((fileNameToRemove: string) => {
            const pathToFile = path.join(databaseDumpFolderName, fileNameToRemove);

            fileSystem.unlink(pathToFile, (errorForRemove: ?Error) => {
                if (isError(errorForRemove)) {
                    console.log('removeOldDataBaseBackUp: can not remove file: ' + errorForRemove.message);
                }
            });
        });
    });
}
*/