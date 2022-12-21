/* global process */

import path from 'path';

import {PaginationQueryType} from './data-base-type';

const cwd = process.cwd();

const dataBaseFolderPath = '/db';
const dataBaseBackUpFolderPath = '/db/back-up';

export const dataBasePathAbsolute = path.join(cwd, dataBaseFolderPath);
export const dataBaseBackUpPathAbsolute = path.join(cwd, dataBaseBackUpFolderPath);

export const defaultPaginationQuery: PaginationQueryType<unknown> = {
    pageIndex: 0,
    pageSize: 0,
    query: {},
    sort: {},
};
