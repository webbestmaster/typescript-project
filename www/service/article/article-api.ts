import {PaginationResultType} from '../../../server/data-base/data-base-type';
import {ArticleType} from '../../../server/article/article-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {articlePaginationSchema} from '../../../server/article/article-validation';
import {apiUrl} from '../../../server/const';

export async function getArticleListPagination(): Promise<PaginationResultType<ArticleType>> {
    return fetchX<PaginationResultType<ArticleType>>(apiUrl.articleListPagination, articlePaginationSchema, {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}
