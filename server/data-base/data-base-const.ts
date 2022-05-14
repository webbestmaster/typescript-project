import {PaginationQueryType} from './data-base-type';

export const defaultPaginationQuery: PaginationQueryType<unknown> = {
    pageIndex: 0,
    pageSize: 0,
    query: {},
    queryExtended: {},
    sort: {},
};
