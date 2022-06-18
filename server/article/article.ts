/* global setTimeout */

import {makeCrud} from '../data-base/data-base';
import {CrudConfigOnChangeArgumentType} from '../data-base/data-base-type';
import {updateSiteMapXml} from '../sitemap/sitemap';

import {ArticleType} from './article-type';
import {makeArticleSchema} from './article-validation';
import {clearCacheHtmlFileFolder} from './article-cache';

export const articleCrud = makeCrud<ArticleType>(
    {
        dataBaseId: 'article',
        onChange: async (crudConfigOnChange: CrudConfigOnChangeArgumentType) => {
            console.log('update DB');
            console.log('crudConfigOnChange', crudConfigOnChange);

            await clearCacheHtmlFileFolder();
            await updateSiteMapXml();
        },
    },
    makeArticleSchema()
);

setTimeout(updateSiteMapXml, 1e3);
setTimeout(clearCacheHtmlFileFolder, 1e3);
