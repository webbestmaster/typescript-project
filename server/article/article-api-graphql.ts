import {FastifyReply, FastifyRequest} from 'fastify';

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
    GraphQLBoolean,
    GraphQLResolveInfo,
    GraphQLFieldConfig,
} from 'graphql';

import {mainResponseHeader} from '../const';

import {articleCrud} from './article';
import {
    ArticleFileType,
    ArticleFileTypeEnum,
    ArticleType,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from './article-type';

const articleTypeEnumValueMap: Record<keyof typeof ArticleTypeEnum, {value: ArticleTypeEnum}> = {
    article: {value: ArticleTypeEnum.article},
    audioChildrenList: {value: ArticleTypeEnum.audioChildrenList},
    audioList: {value: ArticleTypeEnum.audioList},
    audioSingle: {value: ArticleTypeEnum.audioSingle},
    container: {value: ArticleTypeEnum.container},
};

const ArticleTypeEnumGraphQLType = new GraphQLEnumType({
    name: 'ArticleTypeEnum',
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
    name: 'SubDocumentListViewTypeEnum',
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
    name: 'ArticleFileTypeEnum',
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
    name: 'ArticleFileGraphQLType',
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
    name: 'ArticleGraphQLType',
});

const ArticleListGraphQLType = new GraphQLList(ArticleGraphQLType);

const ListType: GraphQLFieldConfig<{root: string}, {context: number}, {limit: number}> = {
    args: {
        limit: {
            type: GraphQLInt,
        },
    },
    resolve(
        // root valur type => "GraphQLObjectType<Record<string, string>"
        rootValue: {root: string},
        args: {limit: number},
        context: {context: number},
        graphQLType: GraphQLResolveInfo
    ) {
        console.warn('------------');
        console.warn(rootValue);
        console.warn(args);
        console.warn(context);
        console.warn(graphQLType);
        // console.warn(args.length);
        return articleCrud.findMany({isActive: true});
    },
    type: ArticleListGraphQLType,
};

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
    const articleListSchema: GraphQLSchema = new GraphQLSchema({
        query: new GraphQLObjectType<{root: string}, {context: number}>({
            fields: {
                list: ListType,
            },
            name: 'ArticleListQueryType',
        }),
    });

    console.warn(articleListSchema.toString());

    reply.code(200).header(...mainResponseHeader);

    return graphql({
        contextValue: {context: 2},
        rootValue: {
            root: 'value',
        },
        schema: articleListSchema,
        source: `{
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
}`,
    });
}
