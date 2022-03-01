import {arrayToString, defineAsString, stringToArray} from '../util/data-base';
import {getEnumValueEnsure} from '../../www/util/enum';

import {
    ArticleDataBaseType,
    ArticleFullDefinedType,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from './article-type';

export function fullDefinedToDataBaseArticle(article: ArticleFullDefinedType): ArticleDataBaseType {
    const {
        artistList,
        authorList,
        compositorList,
        directorList,
        fileList,
        hasMetaRobotsFollowSeo,
        hasMetaRobotsNoIndexSeo,
        illustratorList,
        isActive,
        isInSiteMapXmlSeo,
        readerList,
        subDocumentIdList,
        tagList,
        ...restArticle
    } = article;

    return {
        artistList: arrayToString(artistList),
        authorList: arrayToString(authorList),
        compositorList: arrayToString(compositorList),
        directorList: arrayToString(directorList),
        fileList: arrayToString(fileList),
        hasMetaRobotsFollowSeo: hasMetaRobotsFollowSeo ? 1 : 0,
        hasMetaRobotsNoIndexSeo: hasMetaRobotsNoIndexSeo ? 1 : 0,
        illustratorList: arrayToString(illustratorList),
        isActive: isActive ? 1 : 0,
        isInSiteMapXmlSeo: isInSiteMapXmlSeo ? 1 : 0,
        readerList: arrayToString(readerList),
        subDocumentIdList: arrayToString(subDocumentIdList),
        tagList: arrayToString(tagList),
        ...restArticle,
    };
}

export function dataBaseToFullDefinedArticle(article: ArticleDataBaseType): ArticleFullDefinedType {
    const {
        articleType,
        artistList,
        authorList,
        compositorList,
        content,
        createdDate,
        description,
        directorList,
        fileList,
        hasMetaRobotsFollowSeo, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id,
        illustratorList,
        isActive, // actually temporary "removed"
        isInSiteMapXmlSeo, // has sitemap.xml link to article on not
        metaDescriptionSeo, // tag <meta type="description" content="....." />
        metaSeo, // actually any html code
        publishDate,
        readerList,
        shortDescription,
        slug,
        subDocumentIdList,
        subDocumentListViewType,
        tagList,
        tagTitleSeo, // tag <title>....</title>
        title,
        titleImage,
        updatedDate,
    } = article;

    return {
        articleType: getEnumValueEnsure<ArticleTypeEnum>(ArticleTypeEnum, articleType, ArticleTypeEnum.article),
        artistList: stringToArray(artistList),
        authorList: stringToArray(authorList),
        compositorList: stringToArray(compositorList),
        content: defineAsString(content),
        createdDate: defineAsString(createdDate),
        description: defineAsString(description),
        directorList: stringToArray(directorList),
        fileList: stringToArray(fileList),
        hasMetaRobotsFollowSeo: Boolean(hasMetaRobotsFollowSeo), // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo: Boolean(hasMetaRobotsNoIndexSeo), // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id,
        illustratorList: stringToArray(illustratorList),
        isActive: Boolean(isActive), // actually temporary "removed"
        isInSiteMapXmlSeo: Boolean(isInSiteMapXmlSeo), // has sitemap.xml link to article on not
        metaDescriptionSeo: defineAsString(metaDescriptionSeo), // tag <meta type="description" content="....." />
        metaSeo: defineAsString(metaSeo), // actually any html code
        publishDate: defineAsString(publishDate),
        readerList: stringToArray(readerList),
        shortDescription: defineAsString(shortDescription),
        slug,
        subDocumentIdList: stringToArray(subDocumentIdList),
        subDocumentListViewType: getEnumValueEnsure<SubDocumentListViewTypeEnum>(
            SubDocumentListViewTypeEnum,
            subDocumentListViewType,
            SubDocumentListViewTypeEnum.header
        ),
        tagList: stringToArray(tagList),
        tagTitleSeo: defineAsString(tagTitleSeo), // tag <title>....</title>
        title: defineAsString(title),
        titleImage: defineAsString(titleImage),
        updatedDate: defineAsString(updatedDate),
    };
}
