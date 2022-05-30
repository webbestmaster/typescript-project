/* global process */
import path from 'path';

import {ArticleType, ArticleTypeEnum} from '../../article/article-type';
import {articleCrud} from '../../article/article';

import {getSiteMapXml} from './sitemap-xml';
import {getSiteMapImgXml} from './sitemap-img-xml';

const sitemapFileName = 'sitemap.xml';
const sitemapImgFileName = 'sitemap-img.xml';

const cwd = process.cwd();

const pathToFrontDistribution = path.join(cwd, 'dist');

export async function updateSiteMapXml(): Promise<void> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true, isInSiteMapXmlSeo: true});

    const siteMapXml = getSiteMapXml(articleList);
    const siteMapXmlImg = getSiteMapImgXml(articleList);

    // console.log(siteMapXml);
    // console.log(siteMapXmlImg);
}
