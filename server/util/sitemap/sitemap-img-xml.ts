import {ArticleType} from '../../article/article-type';
import {getClientArticleLinkWithDomain, getPathToImage} from '../../../www/page/cms/cms-article/cms-article-helper';
import {httpsSiteDomain} from '../../../www/const';

type ArticleImageDataType = {
    alt: string;
    src: string;
};

type ArticleXmlImgDataType = {
    imageList: Array<ArticleImageDataType>;
    url: string;
};

const findImageRegExpGlobal = /!\[([\S\s]*?)]\((\S+?)(?:\s+"([\S\s]+?)")?\)/g;

function getImageListFromArticle(article: ArticleType): ArticleXmlImgDataType {
    const {titleImage, content, title, slug} = article;

    const imageList: Array<ArticleImageDataType> = [];

    if (titleImage) {
        imageList.push({alt: title, src: httpsSiteDomain + getPathToImage(titleImage, {height: 1024, width: 1024})});
    }

    console.log([...content.matchAll(findImageRegExpGlobal)]);

    content.replace(findImageRegExpGlobal, (matchedString: string, alt: string, src: string): string => {
        imageList.push({alt, src: httpsSiteDomain + src});

        return '';
    });

    return {
        imageList,
        url: getClientArticleLinkWithDomain(slug),
    };
}

function ArticleImageDataToString(articleImageData: ArticleImageDataType): string {
    const {alt, src} = articleImageData;

    return [
        '<image:image>',
        `<image:loc>${src}</image:loc>`,
        // -- `            <image:caption>${getLastmodTagContent(mongoDocument)}</image:caption>`,
        // -- `            <image:geo_location>${getLastmodTagContent(mongoDocument)}</image:geo_location>`,
        `<image:title>${alt}</image:title>`,
        // -- `            <image:license>${getLastmodTagContent(mongoDocument)}</image:license>`,
        '</image:image>',
    ].join('\n');
}

function ArticleXmlImgDataToString(articleXmlImg: ArticleXmlImgDataType): string {
    const {imageList, url} = articleXmlImg;

    return ['<url>', `<loc>${url}</loc>`, ...imageList.map(ArticleImageDataToString), '</url>'].join('\n');
}

export function getSiteMapImgXml(articleList: Array<ArticleType>): string {
    const imageDataList: Array<ArticleXmlImgDataType> = articleList.reduce<Array<ArticleXmlImgDataType>>(
        (result: Array<ArticleXmlImgDataType>, article: ArticleType): Array<ArticleXmlImgDataType> => {
            return [...result, getImageListFromArticle(article)];
        },
        []
    );

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        ...imageDataList.map(ArticleXmlImgDataToString),
        '</urlset>',
    ].join('\n');
}
