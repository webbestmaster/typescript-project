import {FastifyReply, FastifyRequest} from 'fastify';
import type {PetsdbQueryType, PetsdbReadPageConfigType} from 'petsdb';

import {mainResponseHeader} from '../const';
import {defaultPaginationQuery} from '../data-base/data-base-const';
import {PaginationResultType} from '../data-base/data-base-type';

import {articleCrud} from './article';
import {ArticleType, ParsedRequestQueryType} from './article-type';
import {tryQueryStringToRegExp} from './article-util';

import {
    graphql,
    buildSchema,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputType,
    ExecutionResult
} from "graphql";

function parseRequestQuery(request: FastifyRequest): ParsedRequestQueryType {
    const {pageConfig, pick, query} = Object.assign(
        {
            pageConfig: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            pick: encodeURIComponent(JSON.stringify([])),
            query: encodeURIComponent(JSON.stringify({})),
        },
        request.query
    );
    const pageConfigParsed: PetsdbReadPageConfigType<ArticleType> = JSON.parse(decodeURIComponent(pageConfig));
    const pickParsed: Array<keyof ArticleType> = JSON.parse(decodeURIComponent(pick));
    const queryParsed: PetsdbQueryType<ArticleType> = JSON.parse(decodeURIComponent(query));

    // eslint-disable-next-line no-loops/no-loops, guard-for-in
    for (const queryKey in queryParsed) {
        const queryValue = {...queryParsed}[queryKey];

        if (typeof queryValue === 'string') {
            Object.assign(queryParsed, {[queryKey]: tryQueryStringToRegExp(queryValue)});
        }
    }

    return {pageConfig: pageConfigParsed, pick: pickParsed, query: queryParsed};
}

// eslint-disable-next-line id-length
export async function getArticleClientListPaginationGraphql(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<ExecutionResult> {
/*
    const {query, pageConfig, pick} = parseRequestQuery(request);

    const articleListPagination: PaginationResultType<Partial<ArticleType>> =
        await articleCrud.findManyPaginationPartial({...query, isActive: true}, pageConfig, pick);
*/



    const ArticleGraphQLType = new GraphQLObjectType({
        name: 'ArticleGraphQLType',
        fields: {
            title: {
                type: GraphQLString,
            },
            content: {
                type: GraphQLString,
                // resolve() {
                //     return 4444;
                // },
            },
        },
    });

    const ArticleListGraphQLType = new GraphQLList(ArticleGraphQLType);

// Construct a schema, using GraphQL schema language
    var schema: GraphQLSchema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                list: {
                    args: {
                        limit: {
                            type: GraphQLInt
                        },
                    },
                    type: ArticleListGraphQLType,
                    resolve(...args) {
                        console.warn('------------')
                        console.warn(args)
                        console.warn(args.length)
                        return articleCrud.findMany({isActive: true});
                    },
                },
            },
        }),
    });

    console.warn(schema.toString());



    reply.code(200).header(...mainResponseHeader);

    return graphql({
        schema,
        source:
`{
  list(limit: 10) {
    title
    content
  }
}`,
    });
}
