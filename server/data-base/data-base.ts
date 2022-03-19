/* global process */

import path from 'path';

import Datastore from 'nedb';

import {PromiseResolveType} from '../../www/util/promise';

const cwd = process.cwd();

type CrudType<ModelType> = {
    createOne: (model: ModelType) => Promise<null>; // throw error if smth wrong
    deleteOne: (model: Partial<ModelType>) => Promise<null>; // throw error if smth wrong
    findMany: (partialModel: Partial<ModelType>) => Promise<Array<ModelType>>;
    findOne: (partialModel: Partial<ModelType>) => Promise<ModelType | null>;
    updateOne: (partialModel: Partial<ModelType>, model: ModelType) => Promise<null>; // throw error if smth wrong
};

function makeSimpleCallBack(
    maybeError: Error | null,
    resolve: PromiseResolveType<null>,
    reject: PromiseResolveType<Error>
) {
    if (maybeError) {
        reject(maybeError);
        return;
    }

    resolve(null);
}

// add jsonScheme as required parameter
export function makeCrud<ModelType>(dataBaseId: string): CrudType<ModelType> {
    const dataBase = new Datastore<ModelType>({
        autoload: true,
        filename: path.join(cwd, 'db', `data-base.${dataBaseId}.db`),
    });

    function findOne(partialUserData: Partial<ModelType>): Promise<ModelType | null> {
        return new Promise<ModelType | null>((resolve: PromiseResolveType<ModelType | null>) => {
            dataBase.findOne<ModelType>(partialUserData, (maybeError: Error | null, data: ModelType | null) => {
                if (maybeError) {
                    resolve(null);
                    return;
                }

                if (!data) {
                    resolve(null);
                    return;
                }

                resolve(data);
            });
        });
    }

    function findMany(partialUserData: Partial<ModelType>): Promise<Array<ModelType>> {
        return new Promise<Array<ModelType>>((resolve: PromiseResolveType<Array<ModelType>>) => {
            // eslint-disable-next-line unicorn/no-array-method-this-argument
            dataBase.find<ModelType>(partialUserData, (maybeError: Error | null, data: Array<ModelType> | null) => {
                if (maybeError) {
                    resolve([]);
                    return;
                }

                if (!Array.isArray(data)) {
                    resolve([]);
                    return;
                }

                resolve(data);
            });
        });
    }

    // throw error if smth wrong
    function createOne(userData: ModelType): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            dataBase.insert<ModelType>(userData, (maybeError: Error | null): void =>
                makeSimpleCallBack(maybeError, resolve, reject)
            );
        });
    }

    // throw error if smth wrong
    function updateOne(searchUserData: Partial<ModelType>, userData: ModelType): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            dataBase.update<ModelType>(searchUserData, userData, {}, (maybeError: Error | null): void =>
                makeSimpleCallBack(maybeError, resolve, reject)
            );
        });
    }

    // throw error if smth wrong
    function deleteOne(searchUserData: Partial<ModelType>): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            dataBase.remove(searchUserData, {}, (maybeError: Error | null): void =>
                makeSimpleCallBack(maybeError, resolve, reject)
            );
        });
    }

    return {createOne, deleteOne, findMany, findOne, updateOne};
}
