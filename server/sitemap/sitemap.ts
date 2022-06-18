/* global process */
import path from 'path';

import {ArticleType} from '../article/article-type';
import {articleCrud} from '../article/article';
import {writeStringToFile} from '../util/file';

import {getSiteMapXml} from './sitemap-xml';
import {getSiteMapImgXml} from './sitemap-img-xml';

const cwd = process.cwd();

export async function updateSiteMapXml(): Promise<void> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true, isInSiteMapXmlSeo: true});

    const siteMapXml = getSiteMapXml(articleList);

    await writeStringToFile(path.join(cwd, 'dist', 'sitemap.xml'), siteMapXml);

    const siteMapXmlImg = getSiteMapImgXml(articleList);

    await writeStringToFile(path.join(cwd, 'dist', 'sitemap-img.xml'), siteMapXmlImg);

    console.log('[updateSiteMapXml]: done');
}
