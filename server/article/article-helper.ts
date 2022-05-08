import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from './article-type';

export function makeDefaultArticle(): ArticleType {
    const defaultArticleData: ArticleType = {
        articleType: ArticleTypeEnum.article,
        content: '',
        createdDate: '',
        description: '',
        descriptionShort: '',
        fileList: [],
        hasMetaRobotsNoFollowSeo: false, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo: false, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id: '',
        isActive: true, // actually temporary "removed"
        isInSiteMapXmlSeo: true, // has sitemap.xml link to article or not
        metaDescriptionSeo: '', // tag <meta type="description" content="....." />
        metaKeyWordsSeo: '', // tag <meta type="keywords" content="....." />
        metaSeo: '', // actually any html code
        publishDate: '',
        slug: '',
        stuffArtistList: [],
        stuffAuthorList: [],
        stuffCompositorList: [],
        stuffDirectorList: [],
        stuffIllustratorList: [],
        stuffReaderList: [],
        subDocumentIdList: [],
        subDocumentListViewType: SubDocumentListViewTypeEnum.header,
        tagList: [],
        tagTitleSeo: '', // tag <title>....</title>
        title: '',
        titleImage: '',
        updatedDate: '',
    };

    return defaultArticleData;
}