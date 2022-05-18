import {makeCrud} from '../data-base/data-base';
import {CrudConfigOnChangeArgumentType} from '../data-base/data-base-type';

import {ArticleType} from './article-type';
import {makeArticleSchema} from './article-validation';

export const articleCrud = makeCrud<ArticleType>(
    {
        dataBaseId: 'article',
        onChange: (data: CrudConfigOnChangeArgumentType) => {
            console.log('update DB');
            console.log('update sitemap.xml');
            console.log('update sitemap-img.xml');
            console.log(JSON.stringify(data));

            return Promise.resolve();
        },
    },
    makeArticleSchema()
);
