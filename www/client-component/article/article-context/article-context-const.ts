import {makeDefaultArticle} from '../../../../server/article/article-helper';

import {ArticleContextType} from './article-context-type';

export const defaultArticleContextData: ArticleContextType = {
    article: makeDefaultArticle(),
    breadcrumbs: [],
    childList: [],
    siblingList: [],
};
