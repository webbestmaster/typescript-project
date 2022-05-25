import {ArticleContextType} from '../../www/client-component/article/article-context/article-context-type';
import {defaultArticleContextData} from '../../www/client-component/article/article-context/article-context-const';

import {
    getArticleBySlug,
    getArticlePreviewBreadcrumbListById,
    getArticlePreviewListByIdListFiltered,
    getSiblingPreviewListById,
} from './article-util';
import {makeDefaultArticle} from './article-helper';
import {ArticlePreviewType} from './article-type';

export function getIsActiveArticlePreview(article: ArticlePreviewType): article is ArticlePreviewType {
    return article.isActive;
}

export async function getClientArticle(slug: string): Promise<ArticleContextType> {
    const article = (await getArticleBySlug(slug)) || makeDefaultArticle();

    if (!article.isActive || article.id === '') {
        return defaultArticleContextData;
    }

    const {subDocumentIdList, id} = article;

    const [childList, siblingList, breadcrumbs] = await Promise.all([
        getArticlePreviewListByIdListFiltered(subDocumentIdList),
        getSiblingPreviewListById(id),
        getArticlePreviewBreadcrumbListById(id),
    ]);

    return {
        article,
        breadcrumbs: breadcrumbs.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        childList: childList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        siblingList: siblingList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };
}
