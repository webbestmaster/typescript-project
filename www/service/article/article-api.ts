import {PaginationResultType} from '../../../server/data-base/data-base-type';
import {ArticleType} from '../../../server/article/article-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {
    makeArticlePaginationSchema,
    makeArticlePaginationSchemaPick,
    makeArticleSchema,
} from '../../../server/article/article-validation';
import {apiUrl} from '../../../server/const';

export async function getArticleListPagination(): Promise<PaginationResultType<ArticleType>> {
    return fetchX<PaginationResultType<ArticleType>>(apiUrl.adminArticleListPagination, makeArticlePaginationSchema(), {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}

export async function getArticleListPaginationPartial<Keys extends keyof ArticleType>(
    fieldList: Array<Keys>
): Promise<PaginationResultType<Pick<ArticleType, Keys>>> {
    return fetchX<PaginationResultType<Pick<ArticleType, Keys>>>(
        `${apiUrl.adminArticleListPaginationPick}?fields=${fieldList.join(',')}`,
        makeArticlePaginationSchemaPick<Keys>(fieldList),
        {
            credentials: 'include',
            method: FetchMethodEnum.get,
        }
    );
}

export async function postArticleCreate(article: ArticleType): Promise<ArticleType> {
    return fetchX<ArticleType>(apiUrl.adminArticleCreate, makeArticleSchema(), {
        body: JSON.stringify(article),
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}
