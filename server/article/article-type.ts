export enum ArticleTypeEnum {
    article = 'article',
    container = 'container',
    root = 'root',
}

export enum SubDocumentListViewTypeEnum {
    header = 'header', // just header
    headerAudio = 'header-audio', // header + audio
    headerImage = 'header-image', // header + image
}

export type ArticleType = {
    articleType: ArticleTypeEnum;
    content: string;
    createdDate: string;
    description: string;
    fileList: Array<string>;
    hasMetaRobotsFollowSeo: boolean; // Add/combine <meta name="robots" content="nofollow"/>
    hasMetaRobotsNoIndexSeo: boolean; // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
    id: string;
    isActive: boolean; // actually temporary "removed"
    isInSiteMapXmlSeo: boolean; // has sitemap.xml link to article on not
    metaDescriptionSeo: string; // tag <meta type="description" content="....." />
    metaSeo: string; // actually any html code
    publishDate: string;
    shortDescription: string;
    slug: string;
    stuffArtistList: Array<string>;
    stuffAuthorList: Array<string>;
    stuffCompositorList: Array<string>;
    stuffDirectorList: Array<string>;
    stuffIllustratorList: Array<string>;
    stuffReaderList: Array<string>;
    subDocumentIdList: Array<string>;
    subDocumentListViewType: SubDocumentListViewTypeEnum;
    tagList: Array<string>;
    tagTitleSeo: string; // tag <title>....</title>
    title: string;
    titleImage: string;
    updatedDate: string;
};
