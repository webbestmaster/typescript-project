import {PaginationResultType} from '../../../server/data-base/data-base-type';
import {ArticleType} from '../../../server/article/article-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {articlePaginationSchema} from '../../../server/article/article-validation';

export async function getArticleListPagination(): Promise<PaginationResultType<ArticleType>> {
    return fetchX<PaginationResultType<ArticleType>>('/api/article/list-pagination', articlePaginationSchema, {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}
