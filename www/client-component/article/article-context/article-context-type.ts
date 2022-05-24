import {ArticleType, ArticlePreviewType} from '../../../../server/article/article-type';

export type ArticleContextType = {
    article: ArticleType;
    childList: Array<ArticlePreviewType>;
    siblingList: Array<ArticlePreviewType>;
};
