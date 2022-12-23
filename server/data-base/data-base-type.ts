import type {PetsdbItemType, PetsdbQueryType, PetsdbReadPageConfigType, PetsdbReadPageResultType} from 'petsdb';

export type CrudConfigOnChangeArgumentType = {
    dataBaseFileName: string;
    dataBaseId: string;
    dataBasePath: string;
};

export type CrudConfigType = {
    dataBaseId: string;
    onChange: (data: CrudConfigOnChangeArgumentType) => Promise<void>;
    onInit: (data: CrudConfigOnChangeArgumentType) => Promise<void>;
};

export type RegExpQueryType = {
    $regex: string; // Operators ($lt, $lte, $gt, $gte, $in, $nin, $ne, $exists, $regex)
    $regexFlag: string; // 'g' | 'gi' | 'i';
};

export type CrudType<ModelType extends Record<string, unknown>> = {
    createOne: (model: ModelType) => Promise<null>; // throw error if smth wrong
    deleteOne: (query: PetsdbQueryType<ModelType>) => Promise<null>; // throw error if smth wrong
    findMany: (query: PetsdbQueryType<ModelType>) => Promise<Array<PetsdbItemType<ModelType>>>;
    findManyPagination: (
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>
    ) => Promise<PetsdbReadPageResultType<ModelType>>;
    findManyPaginationPartial: (
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>,
        requiredPropertyList: Array<keyof ModelType>
    ) => Promise<PetsdbReadPageResultType<Partial<ModelType>>>;
    findOne: (query: PetsdbQueryType<ModelType>) => Promise<PetsdbItemType<ModelType> | null>;
    updateOne: (query: PetsdbQueryType<ModelType>, model: ModelType) => Promise<null>; // throw error if smth wrong
};

/*
export enum SortDirectionEnum {
    asc = 'asc',
    desc = 'desc',
}
*/

/*
export type GetListPaginationArgumentType = {
    needShowInactive: boolean;
    pageIndex: number; // start with 0
    pageSize: number;
    sortBy: string;
    sortDirection: SortDirectionEnum;
};
*/

/*
export type GetListPaginationResultType<ItemType> = GetListPaginationArgumentType & {
    allItemCount: number;
    itemList: Array<ItemType>;
};
*/

export type PaginationQueryType<ModelType extends Record<string, unknown>> = {
    pageConfig: PetsdbReadPageConfigType<ModelType>;
    query: PetsdbQueryType<ModelType>;
};

/*
export type PaginationResultType<ModelType> = {
    count: number;
    pageIndex: number;
    pageSize: number;
    result: Array<ModelType>;
};
*/

export type PaginationResultType<ModelType extends Record<string, unknown>> = {
    list: Array<ModelType>;
    pageIndex: number;
    pageSize: number;
    sort: Record<string, unknown>;
    totalItemCount: number;
    totalPageCount: number;
};
