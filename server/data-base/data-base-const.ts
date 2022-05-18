import {PaginationQueryType} from './data-base-type';

export const dataBaseFolderPath = '/db';
export const dataBaseBackUpFolderPath = '/db/back-up';

export const defaultPaginationQuery: PaginationQueryType<unknown> = {
    pageIndex: 0,
    pageSize: 0,
    query: {},
    sort: {},
};
