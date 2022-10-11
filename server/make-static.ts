/* global process, fetch, Response, Buffer */
import fileSystem, {promises as fileSystemPromise} from 'fs';
import path from 'path';

import {getArticleLinkToViewClient} from '../www/client-component/article/article-helper';
import {generatePath} from '../www/util/url';
import {appRoute} from '../www/component/app/app-route';
import {appIconPngFileName, companyLogoPngFileName} from '../www/const';
import {getPathToImage} from '../www/page/cms/cms-article/cms-article-helper';

import {articleCrud} from './article/article';
import {ArticleType} from './article/article-type';
import {uploadFileFolder} from './file/file-const';
import {apiUrl} from './const';

const staticSiteFolderName = 'static-site';
const mainUrl = 'http://127.0.0.1:3000';

const cwd = process.cwd();

type StaticPageType = Readonly<{
    html: string;
    slug: string;
}>;

async function getTextFromUrl(fullUrl: string): Promise<string> {
    const response = await fetch(fullUrl);

    return response.text();
}

async function getStaticPage(slug: string): Promise<StaticPageType> {
    const fullPageUrl = mainUrl + getArticleLinkToViewClient(slug);
    const html = await getTextFromUrl(fullPageUrl);

    return {html, slug};
}

async function copyFrontFolder(): Promise<void> {
    try {
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName));
        // eslint-disable-next-line no-empty
    } catch {}

    await fileSystemPromise.cp(path.join(cwd, 'dist'), path.join(cwd, staticSiteFolderName), {recursive: true});
}

async function copyStaticFileFolder(): Promise<void> {
    try {
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName));
        // eslint-disable-next-line no-empty
    } catch {}

    await fileSystemPromise.cp(
        path.join(cwd, uploadFileFolder),
        path.join(cwd, staticSiteFolderName, uploadFileFolder),
        {recursive: true}
    );
}

async function collectHtmlPages(): Promise<Array<StaticPageType>> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true, isInSiteMapXmlSeo: true});

    const slugList = articleList.map<string>((article: ArticleType): string => {
        return article.slug;
    });

    const pageList: Array<StaticPageType> = [];

    // eslint-disable-next-line no-loops/no-loops
    for (const slug of slugList) {
        pageList.push(await getStaticPage(slug));
    }

    return pageList;
}

async function makeHtmlPages(pageList: Array<StaticPageType>) {
    try {
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName, 'article'));
        // eslint-disable-next-line no-empty
    } catch {}

    // write html files
    // eslint-disable-next-line no-loops/no-loops
    for (const page of pageList) {
        const htmlPath = generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug: page.slug}) + '.html';

        await fileSystemPromise.writeFile(path.join(cwd, staticSiteFolderName, htmlPath), page.html);
    }
}

async function makeApiArticle(pageList: Array<StaticPageType>) {
    // api/client-article/header-1
    try {
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName, 'api'));
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName, 'api', 'client-article'));
        // eslint-disable-next-line no-empty
    } catch {}

    // write html files
    // eslint-disable-next-line no-loops/no-loops
    for (const page of pageList) {
        const apiPath = generatePath<typeof apiUrl.clientArticleContextGet>(apiUrl.clientArticleContextGet, {
            slug: page.slug,
        });
        const data = await getTextFromUrl(mainUrl + apiPath);

        await fileSystemPromise.writeFile(
            path.join(cwd, staticSiteFolderName, 'api', 'client-article', page.slug),
            data
        );
    }
}

// eslint-disable-next-line max-statements
async function makeIcons() {
    try {
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName, 'api-image'));
        // eslint-disable-next-line no-empty
    } catch {}

    const appIconSizeList: Array<number> = [
        // manifest.json, check in manifest.json
        36, 48, 72, 96, 144, 192, 512, 1024, 2048,
        // apple icon, check in index.html
        57, 60, 72, 76, 114, 120, 144, 152, 180,
    ];

    // eslint-disable-next-line no-loops/no-loops
    for (const iconSize of appIconSizeList) {
        const sizeFolderName = `${iconSize}x${iconSize}`;

        try {
            await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName, 'api-image', sizeFolderName));
            // eslint-disable-next-line no-empty
        } catch {}

        const iconImagePath = getPathToImage(appIconPngFileName, {height: iconSize, width: iconSize});
        const responseIcon: Response = await fetch(mainUrl + iconImagePath);
        const responseIconArrayBuffer = await responseIcon.arrayBuffer();
        const responseIconBuffer = Buffer.from(responseIconArrayBuffer);

        fileSystem.createWriteStream(path.join(cwd, staticSiteFolderName, iconImagePath)).write(responseIconBuffer);
    }

    const logoWidth = 600;
    const logoHeight = 60;

    try {
        await fileSystemPromise.mkdir(path.join(cwd, staticSiteFolderName, 'api-image', `${logoWidth}x${logoHeight}`));
        // eslint-disable-next-line no-empty
    } catch {}

    const companyLogoPath = getPathToImage(companyLogoPngFileName, {height: logoHeight, width: logoWidth});
    const responseLogo: Response = await fetch(mainUrl + companyLogoPath);
    const responseLogoArrayBuffer = await responseLogo.arrayBuffer();
    const responseLogoBuffer = Buffer.from(responseLogoArrayBuffer);

    fileSystem.createWriteStream(path.join(cwd, staticSiteFolderName, companyLogoPath)).write(responseLogoBuffer);
}

async function makeImages(pageList: Array<StaticPageType>) {
    const imageUrlSet = new Set<string>();

    pageList.forEach((page: StaticPageType) => {
        const urlList: Array<string> = page.html.match(/\/api-image\/[^\s"]+/gi) || [];

        urlList.forEach((url: string) => {
            imageUrlSet.add(url);
        });
    });

    const imageUrlList: Array<string> = [...imageUrlSet];

    // eslint-disable-next-line no-loops/no-loops
    for (const imageUrl of imageUrlList) {
        const imageUrlChunks = imageUrl.split('/');
        const imageName = imageUrlChunks[3];
        const imageSize = imageUrlChunks[2];

        console.log(imageName, imageSize);
    }
}

export async function makeStatic() {
    await copyFrontFolder();
    await copyStaticFileFolder();

    const pageList: Array<StaticPageType> = await collectHtmlPages();

    await makeHtmlPages(pageList);
    await makeApiArticle(pageList);
    await makeIcons();

    await makeImages(pageList);
}
