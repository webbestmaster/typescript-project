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
