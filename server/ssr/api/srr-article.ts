import {ArticleContextType} from '../../../www/client-component/article/article-context/article-context-type';
import {makeDefaultArticle} from '../../article/article-helper';
import {
    getArticleBySlug,
    getArticlePreviewBreadcrumbListById,
    getArticlePreviewListByIdListFiltered,
    getIsActiveArticlePreview,
    getSiblingPreviewListById,
} from '../../article/article-util';
import {defaultArticleContextData} from '../../../www/client-component/article/article-context/article-context-const';
import {ArticlePreviewType} from '../../article/article-type';
import {
    articleReplaceSelectorBegin,
    articleReplaceSelectorEnd,
    articleSsrFieldName,
} from '../../../www/client-component/article/article-const';
import {rootArticleSlug} from '../../article/article-const';

export async function getClientArticleContextData(slug: string): Promise<[ArticleContextType, string]> {
    const article = (await getArticleBySlug(slug || rootArticleSlug)) || makeDefaultArticle();

    if (!article.isActive || article.id === '') {
        const articleDataHtmlStringNotFound: string = [
            articleReplaceSelectorBegin,
            `window.${articleSsrFieldName} = '${JSON.stringify(defaultArticleContextData)}'`,
            articleReplaceSelectorEnd,
        ].join('');

        return [defaultArticleContextData, articleDataHtmlStringNotFound];
    }

    const {subDocumentIdList, id} = article;

    const [childList, siblingList, breadcrumbs] = await Promise.all([
        getArticlePreviewListByIdListFiltered(subDocumentIdList),
        getSiblingPreviewListById(id),
        getArticlePreviewBreadcrumbListById(id),
    ]);

    const articleData: ArticleContextType = {
        article,
        breadcrumbs: breadcrumbs.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        childList: childList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
        isInProgressArticle: false,
        siblingList: siblingList.filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };

    const articleDataHtmlString: string = [
        articleReplaceSelectorBegin,
        `window.${articleSsrFieldName} = '${JSON.stringify(articleData)}'`,
        articleReplaceSelectorEnd,
    ].join('');

    return [articleData, articleDataHtmlString];
}
