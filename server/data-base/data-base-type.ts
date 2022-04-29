export type CrudType<ModelType> = {
    count: (partialModel: Partial<ModelType>) => Promise<number>; // throw error if smth wrong
    createOne: (model: ModelType) => Promise<null>; // throw error if smth wrong
    deleteOne: (model: Partial<ModelType>) => Promise<null>; // throw error if smth wrong
    findMany: (partialModel: Partial<ModelType>) => Promise<Array<ModelType>>;
    findManyPagination: (paginationQuery: PaginationQueryType<ModelType>) => Promise<PaginationResultType<ModelType>>;
    findOne: (partialModel: Partial<ModelType>) => Promise<ModelType | null>;
    updateOne: (partialModel: Partial<ModelType>, model: ModelType) => Promise<null>; // throw error if smth wrong
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
    query: Partial<ModelType>;
    sort: {[key in keyof Partial<ModelType>]: PaginationDirectionType};
};

export type PaginationResultType<ModelType> = {
    pageIndex: number;
    pageSize: number;
    result: Array<ModelType>;
};
