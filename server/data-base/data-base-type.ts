export type CrudConfigOnChangeArgumentType = {
    dataBaseFileName: string;
    dataBaseId: string;
    dataBasePath: string;
};

export type CrudConfigType = {
    dataBaseId: string;
    onChange: (data: CrudConfigOnChangeArgumentType) => void;
};

export type RegExQueryType = {
    $regex: string; // Operators ($lt, $lte, $gt, $gte, $in, $nin, $ne, $exists, $regex)
    $regexFlag: string; // 'g' | 'gi' | 'i';
};

export type CrudSearchQueryType<ModelType> = {
    [key in keyof ModelType]?: ModelType[key] extends Array<unknown>
        ? ModelType[key] | RegExQueryType | string
        : ModelType[key] | RegExQueryType;
};

export type CrudType<ModelType> = {
    // count: (query: PaginationQueryQueryExtendedType<ModelType>) => Promise<number>; // throw error if smth wrong
    createOne: (model: ModelType) => Promise<null>; // throw error if smth wrong
    deleteOne: (model: CrudSearchQueryType<ModelType>) => Promise<null>; // throw error if smth wrong
    findMany: (partialModelData: CrudSearchQueryType<ModelType>) => Promise<Array<ModelType>>;
    findManyPagination: (paginationQuery: PaginationQueryType<ModelType>) => Promise<PaginationResultType<ModelType>>;
    findManyPaginationPartial: (
        paginationQuery: PaginationQueryType<ModelType>,
        requiredPropertyList: Array<keyof ModelType>
    ) => Promise<PaginationResultType<Partial<ModelType>>>;
    /*
    findManyPartial: (
        partialModel: Partial<ModelType>,
        requiredPropertyList: Array<keyof ModelType>
    ) => Promise<Array<Partial<ModelType>>>;
*/
    findOne: (partialModel: CrudSearchQueryType<ModelType>) => Promise<ModelType | null>;
    updateOne: (partialModel: CrudSearchQueryType<ModelType>, model: ModelType) => Promise<null>; // throw error if smth wrong
};

type PaginationDirectionType = -1 | 1;

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

export type PaginationQueryType<ModelType> = {
    pageIndex: number;
    pageSize: number;
    query: CrudSearchQueryType<ModelType>;
    sort: Partial<Record<keyof ModelType, PaginationDirectionType>>;
};

export type PaginationResultType<ModelType> = {
    count: number;
    pageIndex: number;
    pageSize: number;
    result: Array<ModelType>;
};
