import {createHmac} from 'crypto';

import {RunResult} from 'sqlite3';

import {PromiseResolveType} from '../../www/util/promise';

import {sha256key} from './auth-key';
import {AuthUserFullType} from './auth-type';

export function getSha256Hash(text: string): string {
    return createHmac('sha256', sha256key).update(text).digest('hex');
}

export function getRandomStringHash(length: number): string {
    return getSha256Hash(String(Date.now() + Math.random()).replace('.', '')).slice(0, length);
}

export function createRunCallBack(resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) {
    return (runResult?: RunResult) => {
        if (runResult) {
            reject(new Error('[createRunCallBack]: can not run'));
            return;
        }
        resolve();
    };
}

export function createFindUserCallback(resolve: PromiseResolveType<AuthUserFullType | null>) {
    return (error: Error | null, row?: AuthUserFullType) => {
        if (error) {
            console.log('[find user]: error');
            resolve(null);
            return;
        }

        if (!row) {
            console.log('[find user]: can not find, user is not exists');
            resolve(null);
            return;
        }

        resolve(row);
    };
}
