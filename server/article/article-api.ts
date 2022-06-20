import {FastifyReply, FastifyRequest} from 'fastify';

import {PaginationQueryType, PaginationResultType} from '../data-base/data-base-type';
import {mainResponseHeader} from '../const';
import {defaultPaginationQuery} from '../data-base/data-base-const';
import {makeClientArticleContextData} from '../ssr/api/srr-article';
import {getStringFromUnknown} from '../../www/util/type';
import {ArticleContextType} from '../../www/client-component/article/article-context/article-context-type';

import {articleCrud} from './article';
import {ArticleType} from './article-type';
import {validateArticle} from './article-validation';

export async function getArticleListPagination(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<PaginationResultType<ArticleType>> {
    const {pagination} = Object.assign<{pagination: string}, unknown>(
        {pagination: encodeURIComponent(JSON.stringify(defaultPaginationQuery))},
        request.query
    );
    const paginationQuery: PaginationQueryType<ArticleType> = JSON.parse(decodeURIComponent(pagination));
    const articleListPagination: PaginationResultType<ArticleType> = await articleCrud.findManyPagination(
        paginationQuery
    );

    reply.code(200).header(...mainResponseHeader);

    return articleListPagination;
}

// eslint-disable-next-line id-length, sonarjs/no-identical-functions
export async function getArticleListPaginationPick(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<PaginationResultType<Partial<ArticleType>>> {
    const {pagination, pick} = Object.assign(
        {
            pagination: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            pick: encodeURIComponent(JSON.stringify([])),
        },
        request.query
    );
    const paginationQuery: PaginationQueryType<ArticleType> = JSON.parse(decodeURIComponent(pagination));
    const pickQuery: Array<keyof ArticleType> = JSON.parse(decodeURIComponent(pick));

    const articleListPagination: PaginationResultType<Partial<ArticleType>> =
        await articleCrud.findManyPaginationPartial(paginationQuery, pickQuery);

    reply.code(200).header(...mainResponseHeader);

    return articleListPagination;
}

// eslint-disable-next-line complexity, max-statements
export async function postAdminArticleCreate(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<ArticleType | Record<'message', string>> {
    const {body} = request;
    const parsedData: ArticleType = JSON.parse(String(body || '{}'));
    const [isValidArticle, modelJsonSchemaValidate] = validateArticle(parsedData);

    reply.header(...mainResponseHeader);

    if (!isValidArticle) {
        reply.code(400);

        return {message: JSON.stringify(modelJsonSchemaValidate.errors)};
    }

    const {id, slug} = parsedData;

    if (id.trim() === '') {
        reply.code(400);

        return {message: 'Id Should exists.'};
    }

    if (slug.trim() === '') {
        reply.code(400);

        return {message: 'Slug should exists.'};
    }

    const existedArticleById = await articleCrud.findOne({id});

    if (existedArticleById) {
        reply.code(400);

        return {message: `Article with id="${id}" already exists.`};
    }

    const existedArticleBySlug = await articleCrud.findOne({slug});

    if (existedArticleBySlug) {
        reply.code(400);

        return {message: `Article with slug="${slug}" already exists.`};
    }

    const currentDate = new Date().toISOString();

    const actualizedArticle: ArticleType = {
        ...parsedData,
        createdDate: currentDate,
        updatedDate: currentDate,
    };

    await articleCrud.createOne(actualizedArticle);

    reply.code(200);

    return actualizedArticle;
}

// eslint-disable-next-line complexity, max-statements
export async function postAdminArticleUpdate(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<ArticleType | Record<'message', string>> {
    const {body} = request;
    const parsedData: ArticleType = JSON.parse(String(body || '{}'));
    const [isValidArticle, modelJsonSchemaValidate] = validateArticle(parsedData);

    reply.header(...mainResponseHeader);

    if (!isValidArticle) {
        reply.code(400);

        return {message: JSON.stringify(modelJsonSchemaValidate.errors)};
    }

    const {id} = parsedData;

    if (id.trim() === '') {
        reply.code(400);

        return {message: 'Id Should exists.'};
    }

    const existedArticleById = await articleCrud.findOne({id});

    if (!existedArticleById) {
        reply.code(400);

        return {message: `Article with id="${id}" does not exists.`};
    }

    const actualizedArticle: ArticleType = {
        ...parsedData,
        updatedDate: new Date().toISOString(),
    };

    await articleCrud.updateOne({id}, actualizedArticle);

    reply.code(200);

    return actualizedArticle;
}

export async function deleteAdminArticleDelete(
    request: FastifyRequest<{Params: {articleId?: string}}>,
    reply: FastifyReply
): Promise<Record<'articleId', string>> {
    const {params} = request;
    const articleId = getStringFromUnknown(params, 'articleId');

    await articleCrud.deleteOne({id: articleId});

    reply.code(200).header(...mainResponseHeader);

    return {articleId};
}

export async function getClientArticleContextData(
    request: FastifyRequest<{Params: {slug?: string}}>,
    reply: FastifyReply
): Promise<ArticleContextType> {
    const {params} = request;
    const slug = getStringFromUnknown(params, 'slug');

    const [clientArticleData] = await makeClientArticleContextData(slug);

    const status = clientArticleData.article.id === '' ? 404 : 200;

    reply.code(status).header(...mainResponseHeader);

    return clientArticleData;
}

// eslint-disable-next-line id-length, sonarjs/no-identical-functions
export async function getArticleClientListPaginationPick(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<PaginationResultType<Partial<ArticleType>>> {
    const {pagination, pick} = Object.assign(
        {
            pagination: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            pick: encodeURIComponent(JSON.stringify([])),
        },
        request.query
    );
    const paginationQuery: PaginationQueryType<ArticleType> = JSON.parse(decodeURIComponent(pagination));
    const pickQuery: Array<keyof ArticleType> = JSON.parse(decodeURIComponent(pick));

    paginationQuery.query.isActive = true;

    const articleListPagination: PaginationResultType<Partial<ArticleType>> =
        await articleCrud.findManyPaginationPartial(paginationQuery, pickQuery);

    reply.code(200).header(...mainResponseHeader);

    return articleListPagination;
}
