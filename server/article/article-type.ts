import {NullableType} from '../../www/util/type';
import {DataBaseType} from '../util/type';

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

export type ArticleFullDefinedType = {
    articleType: ArticleTypeEnum;
    artistList: Array<string>;
    authorList: Array<string>;
    compositorList: Array<string>;
    content: string;
    createdDate: string;
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
    tagList: Array<string>;
    tagTitleSeo: string; // tag <title>....</title>
    title: string;
    titleImage: string;
    updatedDate: string;
};

export type ArticleDataBaseType = NullableType<DataBaseType<ArticleFullDefinedType>> & {id: string; slug: string};
