import {JSONSchemaType} from 'ajv';

import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from './article-type';

const articleSchemaProperties = {
    articleType: {'enum': Object.values(ArticleTypeEnum), type: 'string'},
    content: {type: 'string'},
    createdDate: {type: 'string'},
    description: {type: 'string'},
    descriptionShort: {type: 'string'},
    fileList: {items: {type: 'string'}, type: 'array'},
    hasMetaRobotsFollowSeo: {type: 'boolean'},
    hasMetaRobotsNoIndexSeo: {type: 'boolean'},
    id: {type: 'string'},
    isActive: {type: 'boolean'}, // actually temporary "removed"
    isInSiteMapXmlSeo: {type: 'boolean'}, // has sitemap.xml link to article on not
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
    'hasMetaRobotsFollowSeo',
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
