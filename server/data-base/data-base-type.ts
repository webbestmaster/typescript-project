export type CrudType<ModelType> = {
    count: (partialModel: Partial<ModelType>) => Promise<number>; // throw error if smth wrong
    createOne: (model: ModelType) => Promise<null>; // throw error if smth wrong
    deleteOne: (model: Partial<ModelType>) => Promise<null>; // throw error if smth wrong
    findMany: (partialModel: Partial<ModelType>) => Promise<Array<ModelType>>;
    findManyPagination: (paginationQuery: PaginationQueryType<ModelType>) => Promise<PaginationResultType<ModelType>>;
    findOne: (partialModel: Partial<ModelType>) => Promise<ModelType | null>;
    updateOne: (partialModel: Partial<ModelType>, model: ModelType) => Promise<null>; // throw error if smth wrong
};

export type PaginationQueryType<ModelType> = {
    pageIndex: number;
    pageSize: number;
    query: Partial<ModelType>;
    sort: {[key in keyof Partial<ModelType>]: -1 | 1};
};

export type PaginationResultType<ModelType> = {
    pageIndex: number;
    pageSize: number;
    result: Array<ModelType>;
};
