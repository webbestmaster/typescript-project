import path from 'path';

import Ajv, {JSONSchemaType} from 'ajv';
import Datastore from 'nedb';

import {Petsdb} from 'petsdb';

import {PromiseResolveType} from '../../www/util/promise';

import {makePreparedQuery, getPartialData, makeSimpleDataBaseCallBack, makeBackUpFolder} from './data-base-util';
import {
    CrudConfigOnChangeArgumentType,
    CrudConfigType,
    CrudSearchQueryType,
    CrudType,
    PaginationQueryType,
    PaginationResultType,
} from './data-base-type';
import {makeDataBaseBackUp} from './data-base-back-up';
import {dataBasePathAbsolute} from './data-base-const';

const ajv = new Ajv();

export function makeCrud<ModelType extends Record<string, unknown>>(
    crudConfig: CrudConfigType,
    modelJsonSchema: JSONSchemaType<ModelType>
): CrudType<ModelType> {
    console.log(new Petsdb({dbPath: 'ss'}));

    const {dataBaseId, onChange, onInit} = crudConfig;
    const dataBaseFileName = `data-base.${dataBaseId}.db`;
    const dataBasePath = path.join(dataBasePathAbsolute, dataBaseFileName);
    const onChangeData: CrudConfigOnChangeArgumentType = {dataBaseFileName, dataBaseId, dataBasePath};

    async function handleDataBaseUpdate(): Promise<void> {
        await makeDataBaseBackUp(onChangeData);
        await onChange(onChangeData);
    }

    const dataBase = new Datastore<ModelType>({
        autoload: true,
        corruptAlertThreshold: 0,
        filename: dataBasePath,
    });

    function count(query: CrudSearchQueryType<ModelType>): Promise<number> {
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

    function findOne(partialModelData: CrudSearchQueryType<ModelType>): Promise<ModelType | null> {
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

    function findMany(partialModelData: CrudSearchQueryType<ModelType>): Promise<Array<ModelType>> {
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

    function findManyPaginationNoCount(
        paginationQuery: PaginationQueryType<ModelType>
    ): Promise<PaginationResultType<ModelType>> {
        return new Promise<PaginationResultType<ModelType>>(
            (resolve: PromiseResolveType<PaginationResultType<ModelType>>) => {
                const {query, pageSize, pageIndex, sort} = paginationQuery;
                const preparedQuery = makePreparedQuery<ModelType>(query);

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
                            resolve({count: 0, pageIndex, pageSize, result: dataList});
                            return;
                        }

                        resolve(noFound);
                    });
            }
        );
    }

    async function findManyPagination(
        paginationQuery: PaginationQueryType<ModelType>
    ): Promise<PaginationResultType<ModelType>> {
        const {query} = paginationQuery;
        const preparedQuery = makePreparedQuery<ModelType>(query);

        return Promise.all([count(preparedQuery), findManyPaginationNoCount(paginationQuery)]).then(
            (data: [number, PaginationResultType<ModelType>]): PaginationResultType<ModelType> => {
                const [countOfItems, result] = data;

                result.count = countOfItems;

                return result;
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
                        return getPartialData<ModelType>(data, requiredPropertyList);
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
                handleDataBaseUpdate();
            });
        });
    }

    // throw error if smth wrong
    function updateOne(searchModelData: CrudSearchQueryType<ModelType>, modelData: ModelType): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
            const isValid = modelJsonSchemaValidate(modelData);

            if (isValid !== true) {
                reject(new Error(JSON.stringify(modelJsonSchemaValidate.errors || '')));
                return;
            }

            dataBase.update<ModelType>(searchModelData, modelData, {}, (maybeError: Error | null): void => {
                makeSimpleDataBaseCallBack(maybeError, resolve, reject);
                handleDataBaseUpdate();
            });
        });
    }

    // throw error if smth wrong
    function deleteOne(searchModelData: CrudSearchQueryType<ModelType>): Promise<null> {
        return new Promise<null>((resolve: PromiseResolveType<null>, reject: PromiseResolveType<Error>) => {
            dataBase.remove(searchModelData, {}, (maybeError: Error | null): void => {
                makeSimpleDataBaseCallBack(maybeError, resolve, reject);
                handleDataBaseUpdate();
            });
        });
    }

    async function makeStructureSelfCheck(): Promise<void> {
        console.info(`Structure self check for ${dataBaseId} started`);

        const allRowList: Array<ModelType> = await findMany({});

        let hasError = false;

        allRowList.forEach((modelData: ModelType) => {
            const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
            const isValid = modelJsonSchemaValidate(modelData);

            if (isValid) {
                return;
            }

            hasError = true;

            console.error('[ERROR]: makeCrud:');
            console.error('[ERROR]: makeCrud: model data');
            console.error(modelData);
            console.error('[ERROR]: makeCrud: errors:');
            console.error(modelJsonSchemaValidate.errors || '');

            /*
                await updateOne({slug:modelData.slug}, {
                    ...modelData,
                    titleImage: {
                        duration: 0, // in seconds
                        height: 0, // original height
                        name: '', // name of file
                        size: 0, // size of file in bytes
                        type: ArticleFileTypeEnum.unknown, // audio, image, etc.
                        width: 0, // original width
                    },
                    fileList: []
                });
            */
        });

        if (hasError) {
            console.error(`[ERROR]: makeCrud: ${dataBaseId} has wrong data!`);
        } else {
            console.info(`[ OK ]: makeCrud: ${dataBaseId} all data correct!`);
        }

        console.info(`Structure self check for ${dataBaseId} finished`);
    }

    (async () => {
        await makeBackUpFolder(dataBaseId);
        await makeDataBaseBackUp(onChangeData);
        await makeStructureSelfCheck();
        await onInit(onChangeData);
    })();

    return {
        // count,
        createOne,
        deleteOne,
        findMany,
        findManyPagination,
        findManyPaginationPartial,
        // findManyPartial,
        findOne,
        updateOne,
    };
}
