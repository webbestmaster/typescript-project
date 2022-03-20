/* global process */

import path from 'path';

import Ajv, {JSONSchemaType} from 'ajv';
import Datastore from 'nedb';

import {PromiseResolveType} from '../../www/util/promise';

const cwd = process.cwd();
const ajv = new Ajv();

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

export function makeCrud<ModelType>(
    dataBaseId: string,
    modelJsonSchema: JSONSchemaType<ModelType>
): CrudType<ModelType> {
    const dataBase = new Datastore<ModelType>({
        autoload: true,
        corruptAlertThreshold: 0,
        filename: path.join(cwd, 'db', `data-base.${dataBaseId}.db`),
    });

    function findOne(partialModelData: Partial<ModelType>): Promise<ModelType | null> {
        return new Promise<ModelType | null>((resolve: PromiseResolveType<ModelType | null>) => {
            dataBase.findOne<ModelType>(partialModelData, (maybeError: Error | null, data: ModelType | null) => {
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

    function findMany(partialModelData: Partial<ModelType>): Promise<Array<ModelType>> {
        return new Promise<Array<ModelType>>((resolve: PromiseResolveType<Array<ModelType>>) => {
            // eslint-disable-next-line unicorn/no-array-method-this-argument
            dataBase.find<ModelType>(partialModelData, (maybeError: Error | null, data: Array<ModelType> | null) => {
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
    function createOne(modelData: ModelType): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
            const isValid = modelJsonSchemaValidate(modelData);

            if (isValid !== true) {
                reject(new Error(JSON.stringify(modelJsonSchemaValidate.errors || '')));
                return;
            }

            dataBase.insert<ModelType>(modelData, (maybeError: Error | null): void =>
                makeSimpleCallBack(maybeError, resolve, reject)
            );
        });
    }

    // throw error if smth wrong
    function updateOne(searchModelData: Partial<ModelType>, modelData: ModelType): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
            const isValid = modelJsonSchemaValidate(modelData);

            if (isValid !== true) {
                reject(new Error(JSON.stringify(modelJsonSchemaValidate.errors || '')));
                return;
            }

            dataBase.update<ModelType>(searchModelData, modelData, {}, (maybeError: Error | null): void =>
                makeSimpleCallBack(maybeError, resolve, reject)
            );
        });
    }

    // throw error if smth wrong
    function deleteOne(searchModelData: Partial<ModelType>): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            dataBase.remove(searchModelData, {}, (maybeError: Error | null): void =>
                makeSimpleCallBack(maybeError, resolve, reject)
            );
        });
    }

    return {createOne, deleteOne, findMany, findOne, updateOne};
}
