import {ArticleFullDefinedType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from './article-type';

export const emptyArticle: ArticleFullDefinedType = {
    artistList: [],
    authorList: [],
    compositorList: [],
    content: '',
    createdDate: '',
    description: '',
    directorList: [],
    fileList: [],
    hasMetaRobotsFollowSeo: false, // Add/combine <meta name="robots" content="nofollow"/>
    hasMetaRobotsNoIndexSeo: false, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
    id: '',
    illustratorList: [],
    isActive: false, // actually temporary "removed"
    isInSiteMapXmlSeo: false, // has sitemap.xml link to article on not
    metaDescriptionSeo: '', // tag <meta type="description" content="....." />
    metaSeo: '', // actually any html code
    publishDate: '',
    readerList: [],
    shortDescription: '',
    slug: '',
    subDocumentIdList: [],
    subDocumentListViewType: SubDocumentListViewTypeEnum.header,
    tagTitleSeo: '', // tag <title>....</title>
    tags: [],
    title: '',
    titleImage: '',
    type: ArticleTypeEnum.article,
    updatedDate: '',
};
