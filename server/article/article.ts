import {makeCrud} from '../data-base/data-base';

import {ArticleType} from './article-type';
import {makeArticleSchema} from './article-validation';

export const articleCrud = makeCrud<ArticleType>('article', makeArticleSchema());
