import Ajv, {JSONSchemaType, ValidateFunction} from 'ajv';

import {PaginationResultType} from '../data-base/data-base-type';

import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from './article-type';

const articleSchemaProperties = {
    articleType: {'enum': Object.values(ArticleTypeEnum), type: 'string'},
    content: {type: 'string'},
    createdDate: {type: 'string'},
    description: {type: 'string'},
    descriptionShort: {type: 'string'},
    fileList: {items: {type: 'string'}, type: 'array'},
    hasMetaRobotsNoFollowSeo: {type: 'boolean'},
    hasMetaRobotsNoIndexSeo: {type: 'boolean'},
    id: {type: 'string'},
    isActive: {type: 'boolean'}, // actually temporary "removed"
    isInSiteMapXmlSeo: {type: 'boolean'}, // has sitemap.xml link to article or not
    metaDescriptionSeo: {type: 'string'}, // tag <meta type="description" content="....." />
    metaKeyWordsSeo: {type: 'string'}, // tag <meta type="keywords" content="....." />
    metaSeo: {type: 'string'}, // actually any html code
    publishDate: {type: 'string'},
    slug: {type: 'string'},
    stuffArtistList: {items: {type: 'string'}, type: 'array'},
    stuffAuthorList: {items: {type: 'string'}, type: 'array'},
    stuffCompositorList: {items: {type: 'string'}, type: 'array'},
    stuffDirectorList: {items: {type: 'string'}, type: 'array'},
    stuffIllustratorList: {items: {type: 'string'}, type: 'array'},
    stuffReaderList: {items: {type: 'string'}, type: 'array'},
    subDocumentIdList: {items: {type: 'string'}, type: 'array'},
    subDocumentListViewType: {'enum': Object.values(SubDocumentListViewTypeEnum), type: 'string'},
    tagList: {items: {type: 'string'}, type: 'array'},
    tagTitleSeo: {type: 'string'}, // tag <title>....</title>
    title: {type: 'string'},
    titleImage: {type: 'string'},
    updatedDate: {type: 'string'},
} as const;

const requiredFieldList: Array<keyof ArticleType> = [
    'articleType',
    'content',
    'createdDate',
    'description',
    'descriptionShort',
    'fileList',
    'hasMetaRobotsNoFollowSeo',
    'hasMetaRobotsNoIndexSeo',
    'id',
    'isActive',
    'isInSiteMapXmlSeo',
    'metaDescriptionSeo',
    'metaKeyWordsSeo',
    'metaSeo',
    'publishDate',
    'slug',
    'stuffArtistList',
    'stuffAuthorList',
    'stuffCompositorList',
    'stuffDirectorList',
    'stuffIllustratorList',
    'stuffReaderList',
    'subDocumentIdList',
    'subDocumentListViewType',
    'tagList',
    'tagTitleSeo',
    'title',
    'titleImage',
    'updatedDate',
];

export const articleSchema: JSONSchemaType<ArticleType> = {
    additionalProperties: false,
    properties: articleSchemaProperties,
    required: requiredFieldList,
    type: 'object',
} as const;

export const articlePaginationSchema: JSONSchemaType<PaginationResultType<ArticleType>> = {
    additionalProperties: false,
    properties: {
        pageIndex: {type: 'number'},
        pageSize: {type: 'number'},
        result: {items: articleSchema, type: 'array'},
    },
    required: [],
    type: 'object',
} as const;

export function validateArticle(data: unknown): [boolean, ValidateFunction<ArticleType>] {
    const ajv = new Ajv();
    const modelJsonSchemaValidate = ajv.compile<ArticleType>(articleSchema);

    const isValidArticle = modelJsonSchemaValidate(data);

    return [isValidArticle, modelJsonSchemaValidate];
}

/*
export function getIsValidArticle(data: unknown): data is ArticleType {
    const ajv = new Ajv();
    const modelJsonSchemaValidate = ajv.compile<ArticleType>(articleSchema);

    const isValidArticle = modelJsonSchemaValidate(data);

    if (modelJsonSchemaValidate.errors?.length) {
        console.log(modelJsonSchemaValidate.errors);
    }

    return isValidArticle;
}
*/
