import {RunResult} from 'sqlite3';

import {PromiseResolveType} from '../../www/util/promise';

export function createRunCallBack(resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) {
    return (runResult?: RunResult) => {
        if (runResult) {
            reject(new Error('[createRunCallBack]: can not run'));
            return;
        }
        resolve();
    };
}

export function createFindCallback<DataType>(resolve: PromiseResolveType<DataType | null>) {
    return (error: Error | null, row?: DataType) => {
        if (error) {
            console.log('[createFindCallback]: error');
            resolve(null);
            return;
        }

        if (!row) {
            console.log('[createFindCallback]: can not find');
            resolve(null);
            return;
        }

        resolve(row);
    };
}
