import {makeCrud} from '../data-base/data-base';

import {ArticleType} from './article-type';

export const articleCrud = makeCrud<ArticleType>('article');
