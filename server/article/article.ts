import {makeCrud} from '../data-base/data-base';
import {CrudConfigOnChangeArgumentType} from '../data-base/data-base-type';
import {updateSiteMapXml} from '../util/sitemap/sitemap';

import {ArticleType} from './article-type';
import {makeArticleSchema} from './article-validation';

export const articleCrud = makeCrud<ArticleType>(
    {
        dataBaseId: 'article',
        onChange: async (crudConfigOnChange: CrudConfigOnChangeArgumentType) => {
            console.log('update DB');
            console.log('crudConfigOnChange', crudConfigOnChange);

            await updateSiteMapXml();
        },
    },
    makeArticleSchema()
);

updateSiteMapXml();
