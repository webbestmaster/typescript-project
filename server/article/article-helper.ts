import {arrayToString} from '../util/data-base';

import {ArticleDataBaseType, ArticleFullDefinedType} from './article-type';

export function dataBaseToFullDefinedArticle(article: ArticleFullDefinedType): ArticleDataBaseType {
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

// export function dataBaseToFullDefinedArticle(article: ArticleDataBaseType): ArticleFullDefinedType {
//
// }
