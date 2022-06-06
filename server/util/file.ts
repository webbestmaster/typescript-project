import fileSystem from 'fs';

import {PromiseResolveType} from '../../www/util/promise';

export function writeStringToFile(pathToFile: string, data: string): Promise<void> {
    return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        fileSystem.writeFile(pathToFile, data, (error: Error | null) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}

