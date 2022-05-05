import {makeCrud} from '../data-base/data-base';

import {makeDefaultArticle} from './article-helper';
import {ArticleType} from './article-type';
import {articleSchema} from './article-validation';

export const articleCrud = makeCrud<ArticleType>('article', articleSchema, makeDefaultArticle);
