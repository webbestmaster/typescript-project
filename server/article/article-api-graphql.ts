import { FastifyReply, FastifyRequest } from "fastify";

import { mainResponseHeader } from "../const";

import { articleCrud } from "./article";
import {
    ArticleFileTypeEnum,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from "./article-type";

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    ExecutionResult,
    // GraphQLNonNull,
    GraphQLEnumType,
    GraphQLBoolean
} from "graphql";
/*
function parseRequestQuery(request: FastifyRequest): ParsedRequestQueryType {
    const { pageConfig, pick, query } = Object.assign(
        {
            pageConfig: encodeURIComponent(JSON.stringify(defaultPaginationQuery)),
            pick: encodeURIComponent(JSON.stringify([])),
            query: encodeURIComponent(JSON.stringify({}))
        },
        request.query
    );
    const pageConfigParsed: PetsdbReadPageConfigType<ArticleType> = JSON.parse(decodeURIComponent(pageConfig));
    const pickParsed: Array<keyof ArticleType> = JSON.parse(decodeURIComponent(pick));
    const queryParsed: PetsdbQueryType<ArticleType> = JSON.parse(decodeURIComponent(query));

    // eslint-disable-next-line no-loops/no-loops, guard-for-in
    for (const queryKey in queryParsed) {
        const queryValue = { ...queryParsed }[queryKey];

        if (typeof queryValue === "string") {
            Object.assign(queryParsed, { [queryKey]: tryQueryStringToRegExp(queryValue) });
        }
    }

    return { pageConfig: pageConfigParsed, pick: pickParsed, query: queryParsed };
} */


const articleTypeEnumValueMap: Record<keyof typeof ArticleTypeEnum, {value: ArticleTypeEnum}> = {
    article: {
        value: ArticleTypeEnum.article
    },
    audioChildrenList: {
        value: ArticleTypeEnum.audioChildrenList
    },
    audioList: {
        value: ArticleTypeEnum.audioList
    },
    audioSingle: {
        value: ArticleTypeEnum.audioSingle
    },
    container: {
        value: ArticleTypeEnum.container
    },
}

const ArticleTypeEnumGraphQLType = new GraphQLEnumType({
    name: "ArticleTypeEnum",
    values: articleTypeEnumValueMap,
});

const subDocumentListViewTypeEnumValueMap: Record<keyof typeof SubDocumentListViewTypeEnum, {value: SubDocumentListViewTypeEnum}> = {
    header: {
        value: SubDocumentListViewTypeEnum.header
    },
    headerImage: {
        value: SubDocumentListViewTypeEnum.headerImage
    },
}

const SubDocumentListViewTypeEnumGraphQLType = new GraphQLEnumType({
    name: "SubDocumentListViewTypeEnum",
    values: subDocumentListViewTypeEnumValueMap,
});

const articleFileTypeEnumValueMap: Record<keyof typeof ArticleFileTypeEnum, {value: ArticleFileTypeEnum}> = {
    audio: {
        value: ArticleFileTypeEnum.audio
    },
    image: {
        value: ArticleFileTypeEnum.image
    },
    unknown: {
        value: ArticleFileTypeEnum.unknown
    },
    video: {
        value: ArticleFileTypeEnum.video
    },
}

const ArticleFileTypeEnumGraphQLType = new GraphQLEnumType({
    name: "ArticleFileTypeEnum",
    values: articleFileTypeEnumValueMap,
});

// ArticleFileTypeEnum

const ArticleFileGraphQLType = new GraphQLObjectType({
    name: "ArticleFileGraphQLType",
    fields: {
        duration: { type: GraphQLFloat }, // in seconds
        height: { type: GraphQLInt }, // original height
        name: { type: GraphQLString }, // name of file
        size: { type: GraphQLInt }, // size of file in bytes
        title: { type: GraphQLString }, // human read able title
        type: { type: ArticleFileTypeEnumGraphQLType }, // audio, image, etc.
        width: { type: GraphQLInt } // original width
    }
});

const ArticleGraphQLType = new GraphQLObjectType({
    name: "ArticleGraphQLType",
    fields: {
        articleType: { type: ArticleTypeEnumGraphQLType },
        content: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        description: { type: GraphQLString },
        descriptionShort: { type: GraphQLString },
        fileList: { type: new GraphQLList(ArticleFileGraphQLType) },
        hasMetaRobotsNoFollowSeo: { type: GraphQLBoolean }, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo: { type: GraphQLBoolean }, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id: { type: GraphQLString },
        isActive: { type: GraphQLBoolean }, // actually temporary "removed"
        isInSiteMapXmlSeo: { type: GraphQLBoolean }, // has sitemap.xml link to article or not
        metaDescriptionSeo: { type: GraphQLString }, // tag <meta name="description" content="....." />
        metaKeyWordsSeo: { type: GraphQLString }, // tag <meta name="keywords" content="....." />
        metaSeo: { type: GraphQLString }, // actually any html code
        publishDate: { type: GraphQLString },
        slug: { type: GraphQLString },
        staffArtistList: { type: new GraphQLList(GraphQLString) },
        staffAuthorList: { type: new GraphQLList(GraphQLString) },
        staffCompositorList: { type: new GraphQLList(GraphQLString) },
        staffDirectorList: { type: new GraphQLList(GraphQLString) },
        staffIllustratorList: { type: new GraphQLList(GraphQLString) },
        staffReaderList: { type: new GraphQLList(GraphQLString) },
        subDocumentIdList: { type: new GraphQLList(GraphQLString) },
        subDocumentListViewType: { type: SubDocumentListViewTypeEnumGraphQLType },
        tagList: { type: new GraphQLList(GraphQLString) },
        tagTitleSeo: { type: GraphQLString }, // tag <title>....</title>
        title: { type: GraphQLString },
        titleImage: { type: ArticleFileGraphQLType },
        updatedDate: { type: GraphQLString }
    }
});

const ArticleListGraphQLType = new GraphQLList(ArticleGraphQLType);

// eslint-disable-next-line id-length
export async function getArticleClientListGraphql(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<ExecutionResult> {
    /*
        const {query, pageConfig, pick} = parseRequestQuery(request);

        const articleListPagination: PaginationResultType<Partial<ArticleType>> =
            await articleCrud.findManyPaginationPartial({...query, isActive: true}, pageConfig, pick);
    */


// Construct a schema, using GraphQL schema language
    var schema: GraphQLSchema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "RootQueryType",
            fields: {
                list: {
                    args: {
                        limit: {
                            type: GraphQLInt
                        }
                    },
                    type: ArticleListGraphQLType,
                    resolve(...args) {
                        console.warn("------------");
                        console.warn(args);
                        console.warn(args.length);
                        return articleCrud.findMany({ isActive: true });
                    }
                }
            }
        })
    });

    console.warn(schema.toString());


    reply.code(200).header(...mainResponseHeader);

    return graphql({
        schema,
        source:
            `{
  list(limit: 1) {
    articleType
    title
    id
    slug
    fileList {
        name
        size
        duration
    }
  }
}`
    });
}
