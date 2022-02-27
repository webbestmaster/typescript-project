export const enum ArticleTypeEnum {
    article = 'article',
    container = 'container',
    root = 'root',
}

export const enum SubDocumentListViewTypeEnum {
    header = 'header', // just header
    headerAudio = 'header-audio', // header + audio
    headerImage = 'header-image', // header + image
}

export type ArticleType = {
    artistList: Array<string>;
    authorList: Array<string>;
    compositorList: Array<string>;
    content: string;
    createDate: string;
    description: string;
    directorList: Array<string>;
    fileList: Array<string>;
    hasMetaRobotsFollowSeo: boolean; // Add/combine <meta name="robots" content="nofollow"/>
    hasMetaRobotsNoIndexSeo: boolean; // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
    id: string;
    illustratorList: Array<string>;
    isActive: boolean; // actually temporary "removed"
    isInSiteMapXmlSeo: boolean; // has sitemap.xml link to article on not
    metaDescriptionSeo: string; // tag <meta type="description" content="....." />
    metaSeo: string; // actually any html code
    publishDate: string;
    readerList: Array<string>;
    shortDescription: string;
    slug: string;
    subDocumentIdList: Array<string>;
    subDocumentListViewType: SubDocumentListViewTypeEnum;
    tagTitleSeo: string; // tag <title>....</title>
    tags: Array<string>;
    title: string;
    titleImage: string;
    type: ArticleTypeEnum;
    updateDate: string;
};
