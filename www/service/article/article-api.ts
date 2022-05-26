import {PaginationQueryType, PaginationResultType} from '../../../server/data-base/data-base-type';
import {ArticleType} from '../../../server/article/article-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {
    makeArticlePaginationSchema,
    makeArticlePaginationSchemaPick,
    makeArticleSchema,
} from '../../../server/article/article-validation';
import {apiUrl} from '../../../server/const';
import {paginationQueryToURLSearchParameters as paginationQueryToURLSearchParameters} from '../../util/url';
import {UnknownObjectType} from '../../util/type';
import {ArticleContextType} from '../../client-component/article/article-context/article-context-type';
import {articleContextDataSchema} from '../../client-component/article/article-context/article-context-const';

export async function getArticleListPagination(
    paginationQuery: PaginationQueryType<ArticleType>
): Promise<PaginationResultType<ArticleType>> {
    const urlSearchParameters = paginationQueryToURLSearchParameters<ArticleType>(paginationQuery, []);

    return fetchX<PaginationResultType<ArticleType>>(
        `${apiUrl.articleListPagination}?${urlSearchParameters.toString()}`,
        makeArticlePaginationSchema(),
        {
            credentials: 'include',
            method: FetchMethodEnum.get,
        }
    );
}

export async function getArticleListPaginationPick<Keys extends keyof ArticleType>(
    paginationQuery: PaginationQueryType<ArticleType>,
    fieldList: Array<Keys>
): Promise<PaginationResultType<Pick<ArticleType, Keys>>> {
    const urlSearchParameters = paginationQueryToURLSearchParameters<ArticleType>(paginationQuery, fieldList);

    return fetchX<PaginationResultType<Pick<ArticleType, Keys>>>(
        `${apiUrl.articleListPaginationPick}?${urlSearchParameters.toString()}`,
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

export async function postArticleUpdate(article: ArticleType): Promise<ArticleType> {
    return fetchX<ArticleType>(apiUrl.adminArticleUpdate, makeArticleSchema(), {
        body: JSON.stringify(article),
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}

export async function deleteArticle(articleId: string): Promise<UnknownObjectType> {
    return fetchX<UnknownObjectType>(
        apiUrl.adminArticleDelete.replace(':articleId', articleId),
        {
            required: [],
            type: 'object',
        },
        {
            credentials: 'include',
            method: FetchMethodEnum.delete,
        }
    );
}

export async function getArticleContextBySlug(slug: string): Promise<ArticleContextType> {
    return fetchX<ArticleContextType>(apiUrl.clientArticleContextGet.replace(':slug', slug), articleContextDataSchema, {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}
