import Ajv, {JSONSchemaType} from 'ajv';

import {Petsdb} from 'petsdb';
import type {PetsdbItemType, PetsdbQueryType, PetsdbReadPageConfigType, PetsdbReadPageResultType} from 'petsdb';

import {makeBackUpFolder} from './data-base-util';
import {CrudConfigOnChangeArgumentType, CrudConfigType, CrudType} from './data-base-type';
import {makeDataBaseBackUp} from './data-base-back-up';
import {dataBaseFolderPath} from './data-base-const';

const ajv = new Ajv();

export function makeCrud<ModelType extends Record<string, unknown>>(
    crudConfig: CrudConfigType,
    modelJsonSchema: JSONSchemaType<ModelType>
): CrudType<ModelType> {
    const {dataBaseId, onChange, onInit} = crudConfig;
    const dataBaseFileName = `data-base.${dataBaseId}.db`;
    const dataBasePath = dataBaseFolderPath + '/' + dataBaseFileName;
    const onChangeData: CrudConfigOnChangeArgumentType = {dataBaseFileName, dataBaseId, dataBasePath};

    async function handleDataBaseUpdate(): Promise<void> {
        await makeDataBaseBackUp(onChangeData);
        await onChange(onChangeData);
    }

    const dataBase = new Petsdb<ModelType>({
        dbPath: dataBasePath,
    });

    /*
    function count(): Promise<number> {
        return new Promise<number>((resolve: PromiseResolveType<number>) => {
            return resolve(dataBase.getSize());
        });
    }
*/

    function findOne(query: PetsdbQueryType<ModelType>): Promise<PetsdbItemType<ModelType> | null> {
        return dataBase.readOne(query);
    }

    function findMany(query: PetsdbQueryType<ModelType>): Promise<Array<PetsdbItemType<ModelType>>> {
        return dataBase.read(query);
    }

    async function findManyPagination(
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>
    ): Promise<PetsdbReadPageResultType<ModelType>> {
        return dataBase.readPage(query, pageConfig);
    }

    function findManyPaginationPartial(
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>,
        requiredPropertyList: Array<keyof PetsdbItemType<ModelType>>
    ): Promise<PetsdbReadPageResultType<Partial<ModelType>>> {
        return findManyPagination(query, pageConfig);

        /*
        .then(
            (paginationData: PetsdbReadPageResultType<ModelType>): PetsdbReadPageResultType<Partial<PetsdbItemType<ModelType>>> => {

                return {
                    ...paginationData,

                    list: paginationData.list.map<Partial<PetsdbItemType<ModelType>>>(
                        (data: PetsdbItemType<ModelType>): Partial<PetsdbItemType<ModelType>> => {
                            return getPartialData<PetsdbItemType<ModelType>>(data, requiredPropertyList);
                        }),
                };


            }
        );
*/
    }

    // throw error if smth wrong
    async function createOne(modelData: ModelType): Promise<null> {
        const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
        const isValid = modelJsonSchemaValidate(modelData);

        if (isValid !== true) {
            throw new Error(JSON.stringify(modelJsonSchemaValidate.errors || ''));
        }

        await dataBase.create(modelData);
        await handleDataBaseUpdate();
        return null;
    }

    // throw error if smth wrong
    async function updateOne(query: PetsdbQueryType<ModelType>, modelData: ModelType): Promise<null> {
        const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
        const isValid = modelJsonSchemaValidate(modelData);

        if (isValid !== true) {
            throw new Error(JSON.stringify(modelJsonSchemaValidate.errors || ''));
        }

        await dataBase.update(query, modelData);
        await handleDataBaseUpdate();

        return null;
    }

    // throw error if smth wrong
    async function deleteOne(query: PetsdbQueryType<ModelType>): Promise<null> {
        await dataBase.delete(query);
        await handleDataBaseUpdate();
        return null;
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
        await dataBase.run();
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
