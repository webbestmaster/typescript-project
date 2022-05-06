import {FastifyReply, FastifyRequest} from 'fastify';

import {PaginationQueryType} from '../data-base/data-base-type';
import {getIsNotAdmin} from '../auth/auth-helper';
import {mainResponseHeader} from '../const';

import {articleCrud} from './article';
import {ArticleType} from './article-type';

export async function getArticleListPagination(
    request: FastifyRequest<{Body: string}>,
    reply: FastifyReply
): Promise<void> {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const {session, query} = request;

    if (await getIsNotAdmin(request)) {
        reply
            .code(403)
            .header(...mainResponseHeader)
            .send(null);
        return;
    }

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
