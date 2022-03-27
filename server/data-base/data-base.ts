/* global process */

import path from 'path';

import Ajv, {JSONSchemaType} from 'ajv';
import Datastore from 'nedb';

import {PromiseResolveType} from '../../www/util/promise';

import {CrudType, PaginationQueryType, PaginationResultType} from './data-base-type';

const cwd = process.cwd();
const ajv = new Ajv();

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

    function count(partialModel: Partial<ModelType>): Promise<number> {
        return new Promise<number>((resolve: PromiseResolveType<number>, reject: PromiseResolveType<Error>) => {
            dataBase.count(partialModel, (maybeError: Error | null, objectCount: number | null): void => {
                if (maybeError) {
                    reject(maybeError);
                    return;
                }

                if (typeof objectCount === 'number') {
                    resolve(objectCount);
                    return;
                }

                reject(new Error(`[ERROR count]: Can not count objects in: ${dataBaseId}`));
            });
        });
    }

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

    function findManyPagination(
        paginationQuery: PaginationQueryType<ModelType>
    ): Promise<PaginationResultType<ModelType>> {
        return new Promise<PaginationResultType<ModelType>>(
            (resolve: PromiseResolveType<PaginationResultType<ModelType>>) => {
                const {query, pageSize, pageIndex, sort} = paginationQuery;

                dataBase
                    .find<ModelType>(query)
                    .sort(sort)
                    .skip(pageIndex * pageSize)
                    .limit(pageSize)
                    .exec((maybeError: Error | null, dataList: Array<ModelType> | null) => {
                        const noFound: PaginationResultType<ModelType> = {pageIndex, pageSize, result: []};

                        if (maybeError) {
                            resolve(noFound);
                            return;
                        }

                        if (Array.isArray(dataList)) {
                            resolve({...noFound, result: dataList});
                            return;
                        }

                        resolve(noFound);
                    });
            }
        );
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

    return {count, createOne, deleteOne, findMany, findManyPagination, findOne, updateOne};
}
