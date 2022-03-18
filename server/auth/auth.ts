/* global process */

import path from 'path';

import Datastore from 'nedb';

import {PromiseResolveType} from '../../www/util/promise';

import {AuthUserFullType, AuthUserType} from './auth-type';

const cwd = process.cwd();

const userDataBase = new Datastore<AuthUserFullType>({
    autoload: true,
    filename: path.join(cwd, 'db', 'data-base.user.db'),
});

export function findUser(partialUserData: Partial<AuthUserType>): Promise<AuthUserFullType | null> {
    return new Promise<AuthUserFullType | null>((resolve: PromiseResolveType<AuthUserFullType | null>) => {
        userDataBase.findOne<AuthUserFullType>(
            partialUserData,
            (maybeError: Error | null, data: AuthUserFullType | null) => {
                if (maybeError) {
                    resolve(null);
                    return;
                }

                if (!data) {
                    resolve(null);
                    return;
                }

                resolve(data);
            }
        );
    });
}

// throw error if smth wrong
export function insertUser(userData: AuthUserFullType): Promise<null> {
    return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
        userDataBase.insert<AuthUserFullType>(
            userData,
            // eslint-disable-next-line sonarjs/no-identical-functions
            (maybeError: Error | null) => {
                if (maybeError) {
                    reject(maybeError);
                    return;
                }

                resolve(null);
            }
        );
    });
}

// throw error if smth wrong
export function updateUser(searchUserData: Partial<AuthUserType>, userData: AuthUserFullType): Promise<null> {
    return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
        userDataBase.update<AuthUserFullType>(
            searchUserData,
            userData,
            {},
            // eslint-disable-next-line sonarjs/no-identical-functions
            (maybeError: Error | null) => {
                if (maybeError) {
                    reject(maybeError);
                    return;
                }

                resolve(null);
            }
        );
    });
}
