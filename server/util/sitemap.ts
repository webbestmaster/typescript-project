import {ArticleType} from '../article/article-type';
import {articleCrud} from '../article/article';

const sitemapFileName = 'sitemap.xml';
const sitemapImgFileName = 'sitemap-img.xml';

function getSiteMapXmlItem(article: ArticleType): string {
    return '';
}

export function getSiteMapXml(articleList: Array<ArticleType>): string {
    const xmlDataList: Array<string> = [];

    return xmlDataList.join('');
}

function getSiteMapXmlImgItem(article: ArticleType): string {
    return '';
}

export function getSiteMapImgXml(articleList: Array<ArticleType>): string {
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<?xml-stylesheet type="text/xsl" href="/gss-0.9.xsl"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        // articleList.map(mongoDocumentToSiteMapXml)
        //     .join('\n'),
        '</urlset>',
    ].join('\n');
}

export async function updateSiteMapXml(): Promise<void> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true});

    const siteMapXmlDataList = getSiteMapXml(articleList);
    const siteMapXmlImgDataList = getSiteMapImgXml(articleList);

    console.log(siteMapXmlDataList);
    console.log(siteMapXmlImgDataList);
}
