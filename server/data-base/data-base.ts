/* global process */

import path from 'path';

import Ajv, {JSONSchemaType} from 'ajv';
import Datastore from 'nedb';

import {PromiseResolveType} from '../../www/util/promise';

import {prepareQuery, partialData, makeSimpleDataBaseCallBack} from './data-base-util';
import {
    CrudConfigOnChangeArgumentType,
    CrudConfigType,
    CrudType,
    PaginationQueryType,
    PaginationResultType,
} from './data-base-type';

const cwd = process.cwd();
const ajv = new Ajv();

// TODO: detect like regexp string and make from it regexp
// detect only this /text/i or /text/
export function makeCrud<ModelType extends Record<string, unknown>>(
    crudConfig: CrudConfigType,
    modelJsonSchema: JSONSchemaType<ModelType>
): CrudType<ModelType> {
    const {dataBaseId, onChange} = crudConfig;
    const dataBaseFileName = `data-base.${dataBaseId}.db`;
    const dataBasePath = path.join(cwd, 'db', dataBaseFileName);

    const onChangeData: CrudConfigOnChangeArgumentType = {dataBaseFileName, dataBasePath};

    const dataBase = new Datastore<ModelType>({
        autoload: true,
        corruptAlertThreshold: 0,
        filename: dataBasePath,
    });

    function count(query: Record<string, unknown>): Promise<number> {
        return new Promise<number>((resolve: PromiseResolveType<number>, reject: PromiseResolveType<Error>) => {
            dataBase.count(query, (maybeError: Error | null, objectCount: number | null): void => {
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

    /*
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
    */

    /*
        function findManyPartial(
            partialModelData: Partial<ModelType>,
            requiredPropertyList: Array<keyof ModelType>
        ): Promise<Array<Partial<ModelType>>> {
            return findMany(partialModelData).then((dataList: Array<ModelType>): Array<Partial<ModelType>> => {
                return dataList.map<Partial<ModelType>>((data: ModelType): Partial<ModelType> => {
                    return partialData<ModelType>(data, requiredPropertyList);
                });
            });
        }
    */

    async function findManyPagination(
        paginationQuery: PaginationQueryType<ModelType>
    ): Promise<PaginationResultType<ModelType>> {
        const {query, pageSize, pageIndex, sort} = paginationQuery;
        const preparedQuery = prepareQuery<ModelType>(query);
        const countOfAll = await count(preparedQuery);

        return new Promise<PaginationResultType<ModelType>>(
            (resolve: PromiseResolveType<PaginationResultType<ModelType>>) => {
                dataBase
                    .find<ModelType>(preparedQuery)
                    .sort(sort)
                    .skip(pageIndex * pageSize)
                    .limit(pageSize)
                    .exec((maybeError: Error | null, dataList: Array<ModelType> | null) => {
                        const noFound: PaginationResultType<ModelType> = {count: 0, pageIndex, pageSize, result: []};

                        if (maybeError) {
                            resolve(noFound);
                            return;
                        }

                        if (Array.isArray(dataList)) {
                            resolve({count: countOfAll, pageIndex, pageSize, result: dataList});
                            return;
                        }

                        resolve(noFound);
                    });
            }
        );
    }

    function findManyPaginationPartial(
        paginationQuery: PaginationQueryType<ModelType>,
        requiredPropertyList: Array<keyof ModelType>
    ): Promise<PaginationResultType<Partial<ModelType>>> {
        return findManyPagination(paginationQuery).then(
            (paginationData: PaginationResultType<ModelType>): PaginationResultType<Partial<ModelType>> => {
                return {
                    ...paginationData,
                    result: paginationData.result.map<Partial<ModelType>>((data: ModelType): Partial<ModelType> => {
                        return partialData<ModelType>(data, requiredPropertyList);
                    }),
                };
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

            dataBase.insert<ModelType>(modelData, (maybeError: Error | null): void => {
                makeSimpleDataBaseCallBack(maybeError, resolve, reject);
                onChange(onChangeData).catch(console.error);
            });
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

            dataBase.update<ModelType>(searchModelData, modelData, {}, (maybeError: Error | null): void => {
                makeSimpleDataBaseCallBack(maybeError, resolve, reject);
                onChange(onChangeData).catch(console.error);
            });
        });
    }

    // throw error if smth wrong
    function deleteOne(searchModelData: Partial<ModelType>): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            dataBase.remove(searchModelData, {}, (maybeError: Error | null): void => {
                makeSimpleDataBaseCallBack(maybeError, resolve, reject);
                onChange(onChangeData).catch(console.error);
            });
        });
    }

    return {
        // count,
        createOne,
        deleteOne,
        // findMany,
        findManyPagination,
        findManyPaginationPartial,
        // findManyPartial,
        findOne,
        updateOne,
    };
}
