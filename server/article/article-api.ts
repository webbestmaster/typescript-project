import {FastifyReply, FastifyRequest} from 'fastify';

import {PaginationQueryType} from '../data-base/data-base-type';
import {mainResponseHeader} from '../const';

import {articleCrud} from './article';
import {ArticleType} from './article-type';
import {validateArticle} from './article-validation';

export async function getAdminArticleListPagination(
    request: FastifyRequest<{Body: string}>,
    reply: FastifyReply
): Promise<void> {
    const paginationQuery: PaginationQueryType<ArticleType> = {
        pageIndex: 0,
        pageSize: 5,
        query: {},
        sort: {title: 1},
    };

    const articleListPagination = await articleCrud.findManyPagination(paginationQuery);

    reply
        .code(200)
        .header(...mainResponseHeader)
        .send(articleListPagination);
}

// eslint-disable-next-line id-length, sonarjs/no-identical-functions
export async function getAdminArticleListPaginationPick(
    request: FastifyRequest<{Body: string}>,
    reply: FastifyReply
): Promise<void> {
    const paginationQuery: PaginationQueryType<ArticleType> = {
        pageIndex: 0,
        pageSize: 5,
        query: {},
        sort: {title: 1},
    };

    const articleListPagination = await articleCrud.findManyPaginationPartial(paginationQuery, ['articleType', 'slug']);

    reply
        .code(200)
        .header(...mainResponseHeader)
        .send(articleListPagination);
}

// eslint-disable-next-line complexity, max-statements
export async function postAdminArticleCreate(
    request: FastifyRequest<{Body: string}>,
    reply: FastifyReply
): Promise<void> {
    const {body} = request;
    const parsedData: ArticleType = JSON.parse(body);
    const [isValidArticle, modelJsonSchemaValidate] = validateArticle(parsedData);

    if (!isValidArticle) {
        reply
            .code(400)
            .header(...mainResponseHeader)
            .send(modelJsonSchemaValidate.errors);
        return;
    }

    const {id, slug} = parsedData;

    if (id.trim() === '') {
        reply
            .code(400)
            .header(...mainResponseHeader)
            .send({message: 'Id Should exists.'});
        return;
    }

    if (slug.trim() === '') {
        reply
            .code(400)
            .header(...mainResponseHeader)
            .send({message: 'Slug Should exists.'});
        return;
    }

    const existedArticleById = await articleCrud.findOne({id});

    if (existedArticleById) {
        reply
            .code(400)
            .header(...mainResponseHeader)
            .send({message: `Article with id=${id} already exists.`});
        return;
    }

    const existedArticleBySlug = await articleCrud.findOne({slug});

    if (existedArticleBySlug) {
        reply
            .code(400)
            .header(...mainResponseHeader)
            .send({message: `Article with slug=${slug} already exists.`});
        return;
    }

    await articleCrud.createOne(parsedData);

    reply
        .code(200)
        .header(...mainResponseHeader)
        .send(parsedData);
}
