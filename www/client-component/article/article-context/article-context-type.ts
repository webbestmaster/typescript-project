import {ArticleType, ArticlePreviewType} from '../../../../server/article/article-type';

export type ArticleContextType = {
    article: ArticleType;
    breadcrumbs: Array<ArticlePreviewType>;
    childList: Array<ArticlePreviewType>;
    siblingList: Array<ArticlePreviewType>;
};
