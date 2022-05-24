import {ArticleContextType} from '../../www/client-component/article/article-context/article-context-type';

import {getArticleById, getArticleBySlug, getArticlePreviewListByIdListFiltered} from './article-util';
import {makeDefaultArticle} from './article-helper';

import {ArticlePreviewType} from './article-type';

async function getClientArticle(slug: string): Promise<ArticleContextType> {
    const article = (await getArticleBySlug(slug)) || makeDefaultArticle();

    const {subDocumentIdList, id} = article;
    // const parentIdList =

    return {
        article,
        childList: await getArticlePreviewListByIdListFiltered(subDocumentIdList),
        siblingList: [],
    };
}

console.log('22');
