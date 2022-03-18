/* global process */

import path from 'path';

import Datastore from 'nedb';

import {ArticleType} from './article-type';

const cwd = process.cwd();

const articleDataBase = new Datastore<ArticleType>({
    autoload: true,
    filename: path.join(cwd, 'db', 'data-base.article.db'),
});

console.log(articleDataBase);
