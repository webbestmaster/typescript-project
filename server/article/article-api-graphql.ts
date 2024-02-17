/* eslint-disable multiline-comment-style, capitalized-comments, line-comment-position, multiline-comment-style */

import type {FastifyReply, FastifyRequest} from "fastify";
import type {PetsdbItemType} from "petsdb";

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    type ExecutionResult,
    // GraphQLNonNull,
    GraphQLEnumType,
    GraphQLBoolean,
    type GraphQLResolveInfo,
    type GraphQLFieldConfig,
} from "graphql";

import {mainResponseHeader} from "../const";

import {articleCrud} from "./article";
import {
    type ArticleFileType,
    ArticleFileTypeEnum,
    type ArticleType,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from "./article-type";

const articleTypeEnumValueMap: Record<keyof typeof ArticleTypeEnum, {value: ArticleTypeEnum}> = {
    article: {value: ArticleTypeEnum.article},
    audioChildrenList: {value: ArticleTypeEnum.audioChildrenList},
    audioList: {value: ArticleTypeEnum.audioList},
    audioSingle: {value: ArticleTypeEnum.audioSingle},
    container: {value: ArticleTypeEnum.container},
};

const ArticleTypeEnumGraphQLType = new GraphQLEnumType({
    name: "ArticleTypeEnum",
    values: articleTypeEnumValueMap,
});

// eslint-disable-next-line id-length
const subDocumentListViewTypeEnumValueMap: Record<
    keyof typeof SubDocumentListViewTypeEnum,
    {value: SubDocumentListViewTypeEnum}
> = {
    header: {
        value: SubDocumentListViewTypeEnum.header,
    },
    headerImage: {
        value: SubDocumentListViewTypeEnum.headerImage,
    },
};

// eslint-disable-next-line id-length
const SubDocumentListViewTypeEnumGraphQLType = new GraphQLEnumType({
    name: "SubDocumentListViewTypeEnum",
    values: subDocumentListViewTypeEnumValueMap,
});

const articleFileTypeEnumValueMap: Record<keyof typeof ArticleFileTypeEnum, {value: ArticleFileTypeEnum}> = {
    audio: {
        value: ArticleFileTypeEnum.audio,
    },
    image: {
        value: ArticleFileTypeEnum.image,
    },
    unknown: {
        value: ArticleFileTypeEnum.unknown,
    },
    video: {
        value: ArticleFileTypeEnum.video,
    },
};

const ArticleFileTypeEnumGraphQLType = new GraphQLEnumType({
    name: "ArticleFileTypeEnum",
    values: articleFileTypeEnumValueMap,
});

const ArticleFileGraphQLType: GraphQLObjectType<ArticleFileType, unknown> = new GraphQLObjectType<
    ArticleFileType,
    unknown
>({
    fields: {
        duration: {type: GraphQLFloat}, // in seconds
        height: {type: GraphQLInt}, // original height
        name: {type: GraphQLString}, // name of file
        size: {type: GraphQLInt}, // size of file in bytes
        title: {type: GraphQLString}, // human read able title
        type: {type: ArticleFileTypeEnumGraphQLType}, // audio, image, etc.
        width: {type: GraphQLInt}, // original width
    },
    name: "ArticleFileGraphQLType",
});

const ArticleGraphQLType: GraphQLObjectType<ArticleType, unknown> = new GraphQLObjectType<ArticleType, unknown>({
    fields: {
        articleType: {type: ArticleTypeEnumGraphQLType},
        content: {type: GraphQLString},
        createdDate: {type: GraphQLString},
        description: {type: GraphQLString},
        descriptionShort: {type: GraphQLString},
        fileList: {type: new GraphQLList(ArticleFileGraphQLType)},
        hasMetaRobotsNoFollowSeo: {type: GraphQLBoolean}, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo: {type: GraphQLBoolean}, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id: {type: GraphQLString},
        isActive: {type: GraphQLBoolean}, // actually temporary "removed"
        isInSiteMapXmlSeo: {type: GraphQLBoolean}, // has sitemap.xml link to article or not
        metaDescriptionSeo: {type: GraphQLString}, // tag <meta name="description" content="....." />
        metaKeyWordsSeo: {type: GraphQLString}, // tag <meta name="keywords" content="....." />
        metaSeo: {type: GraphQLString}, // actually any html code
        publishDate: {type: GraphQLString},
        slug: {type: GraphQLString},
        staffArtistList: {type: new GraphQLList(GraphQLString)},
        staffAuthorList: {type: new GraphQLList(GraphQLString)},
        staffCompositorList: {type: new GraphQLList(GraphQLString)},
        staffDirectorList: {type: new GraphQLList(GraphQLString)},
        staffIllustratorList: {type: new GraphQLList(GraphQLString)},
        staffReaderList: {type: new GraphQLList(GraphQLString)},
        subDocumentIdList: {type: new GraphQLList(GraphQLString)},
        subDocumentListViewType: {type: SubDocumentListViewTypeEnumGraphQLType},
        tagList: {type: new GraphQLList(GraphQLString)},
        tagTitleSeo: {type: GraphQLString}, // tag <title>....</title>
        title: {type: GraphQLString},
        titleImage: {type: ArticleFileGraphQLType},
        updatedDate: {type: GraphQLString},
    },
    name: "ArticleGraphQLType",
});

const ArticleListGraphQLType = new GraphQLList(ArticleGraphQLType);

const ListType: GraphQLFieldConfig<
    {
        /* root: string */
    },
    {
        /* context: number */
    },
    {limit: number; start: number}
> = {
    args: {
        limit: {
            type: GraphQLInt,
        },
        start: {
            type: GraphQLInt,
        },
    },
    // eslint-disable-next-line @typescript-eslint/max-params
    resolve: async (
        // root valur type => "GraphQLObjectType<Record<string, string>"
        rootValue: {
            // root: string
        },
        args: {limit: number; start: number},
        context: {
            // context: number
        },
        graphQLType: GraphQLResolveInfo
    ): Promise<Array<PetsdbItemType<ArticleType>>> => {
        const {start: arrayBegin, limit} = args;
        const arrayEnd: number = arrayBegin + limit;

        console.warn("------------");
        console.warn(rootValue);
        console.warn(args);
        console.warn(context);
        console.warn(graphQLType);

        // console.warn(args.length);
        const articleList: Array<PetsdbItemType<ArticleType>> = await articleCrud.findMany({isActive: true});
        return articleList.slice(arrayBegin, arrayEnd);
    },
    type: ArticleListGraphQLType,
};

// eslint-disable-next-line id-length, require-await
export async function getArticleClientListGraphql(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<ExecutionResult> {
    // eslint-disable-next-line prefer-object-spread
    const {source} = Object.assign({source: encodeURIComponent(JSON.stringify({}))}, request.query);

    // Construct a schema, using GraphQL schema language
    const articleListSchema: GraphQLSchema = new GraphQLSchema({
        query: new GraphQLObjectType<{root: string}, {context: number}>({
            fields: {
                list: ListType,
            },
            name: "ArticleListQueryType",
        }),
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.code(200).header(...mainResponseHeader);

    return graphql({
        contextValue: {
            // context: 2
        },
        rootValue: {
            // root: "value",
        },
        schema: articleListSchema,
        source,
    });
}
