/* global process */

import path from 'path';

import {ArticleType} from '../article/article-type';

import {PaginationQueryType} from './data-base-type';

const cwd = process.cwd();

export const dataBaseFolderPath = './db';
export const dataBaseBackUpFolderPath = '/db/back-up';

export const dataBasePathAbsolute = path.join(cwd, dataBaseFolderPath);
export const dataBaseBackUpPathAbsolute = path.join(cwd, dataBaseBackUpFolderPath);

export const defaultPaginationQuery: PaginationQueryType<ArticleType> = {
    pageConfig: {
        pageIndex: 0,
        pageSize: 0,
        sort: {},
    },
    query: {},
};
