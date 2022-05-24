import {ArticleContextType} from '../../www/client-component/article/article-context/article-context-type';
import {defaultArticleContextData} from '../../www/client-component/article/article-context/article-context-const';

import {getArticleBySlug, getArticlePreviewListByIdListFiltered, getSiblingPreviewListById} from './article-util';
import {makeDefaultArticle} from './article-helper';
import {ArticlePreviewType} from './article-type';

function getIsActiveArticlePreview(article: ArticlePreviewType): article is ArticlePreviewType {
    return article.isActive;
}

export async function getClientArticle(slug: string): Promise<ArticleContextType> {
    const article = (await getArticleBySlug(slug)) || makeDefaultArticle();

    if (!article.isActive || article.id === '') {
        return defaultArticleContextData;
    }

    const {subDocumentIdList, id} = article;

    const [childList, siblingList] = await Promise.all([
        getArticlePreviewListByIdListFiltered(subDocumentIdList),
        getSiblingPreviewListById(id),
    ]);

    return {
        article,
        childList: childList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        siblingList: siblingList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };
}
