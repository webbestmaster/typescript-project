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
import {apiUrl, serverPort} from './const';

const staticSiteFolderName = 'static-site';
const mainUrl = `http://127.0.0.1:${serverPort}`;

const cwd = process.cwd();

type StaticPageType = Readonly<{
    html: string;
    slug: string;
}>;

async function tryToMkdir(...args: Array<string>): Promise<void> {
    try {
        await fileSystemPromise.mkdir(path.join(...args));
    } catch {
        console.log('[ERROR]: tryToMkdir: can not create folder:', path.join(...args));
    }
}

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
    await tryToMkdir(cwd, staticSiteFolderName);

    await fileSystemPromise.cp(path.join(cwd, 'dist'), path.join(cwd, staticSiteFolderName), {recursive: true});
}

async function copyStaticFileFolder(): Promise<void> {
    await tryToMkdir(cwd, staticSiteFolderName);

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
    await tryToMkdir(cwd, staticSiteFolderName, 'article');

    // write html files
    // eslint-disable-next-line no-loops/no-loops
    for (const page of pageList) {
        const htmlPath = generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug: page.slug}) + '.html';

        await fileSystemPromise.writeFile(path.join(cwd, staticSiteFolderName, htmlPath), page.html);
    }
}

async function makeApiArticle(pageList: Array<StaticPageType>) {
    await tryToMkdir(cwd, staticSiteFolderName, 'api');
    await tryToMkdir(cwd, staticSiteFolderName, 'api', 'client-article');

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

async function makeIcons() {
    await tryToMkdir(cwd, staticSiteFolderName, 'api-image');

    const appIconSizeList: Array<number> = [
        // manifest.json, check in manifest.json
        36, 48, 72, 96, 144, 192, 512, 1024, 2048,
        // apple icon, check in index.html
        57, 60, 72, 76, 114, 120, 144, 152, 180,
    ];

    // eslint-disable-next-line no-loops/no-loops
    for (const iconSize of appIconSizeList) {
        const sizeFolderName = `${iconSize}x${iconSize}`;

        await tryToMkdir(cwd, staticSiteFolderName, 'api-image', sizeFolderName);

        const iconImagePath = getPathToImage(appIconPngFileName, {height: iconSize, width: iconSize});
        const responseIcon: Response = await fetch(mainUrl + iconImagePath);
        const responseIconArrayBuffer = await responseIcon.arrayBuffer();
        const responseIconBuffer = Buffer.from(responseIconArrayBuffer);

        fileSystem.createWriteStream(path.join(cwd, staticSiteFolderName, iconImagePath)).write(responseIconBuffer);
    }
}
async function makeCompanyLogo() {
    const logoWidth = 600;
    const logoHeight = 60;

    await tryToMkdir(cwd, staticSiteFolderName, 'api-image');
    await tryToMkdir(cwd, staticSiteFolderName, 'api-image', `${logoWidth}x${logoHeight}`);

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
        const imageName = imageUrlChunks.pop();
        const imageSize = imageUrlChunks.pop();

        console.log(imageName, imageSize);
    }
}

// eslint-disable-next-line max-statements
export async function makeStatic() {
    console.log('> [makeStatic]: makeStatic: begin');

    console.log('>> [makeStatic]: copyFrontFolder: begin');
    await copyFrontFolder();
    console.log('>> [makeStatic]: copyFrontFolder: end');

    console.log('>> [makeStatic]: copyStaticFileFolder: begin');
    await copyStaticFileFolder();
    console.log('>> [makeStatic]: copyStaticFileFolder: end');

    console.log('>> [makeStatic]: collectHtmlPages: begin');
    const pageList: Array<StaticPageType> = await collectHtmlPages();

    console.log('>> [makeStatic]: collectHtmlPages: end');

    console.log('>> [makeStatic]: makeHtmlPages: begin');
    await makeHtmlPages(pageList);
    console.log('>> [makeStatic]: makeHtmlPages: end');

    console.log('>> [makeStatic]: makeApiArticle: begin');
    await makeApiArticle(pageList);
    console.log('>> [makeStatic]: makeApiArticle: end');

    console.log('>> [makeStatic]: makeIcons: begin');
    await makeIcons();
    console.log('>> [makeStatic]: makeIcons: end');

    console.log('>> [makeStatic]: makeCompanyLogo: begin');
    await makeCompanyLogo();
    console.log('>> [makeStatic]: makeCompanyLogo: end');

    console.log('>> [makeStatic]: makeImages: begin');
    await makeImages(pageList);
    console.log('>> [makeStatic]: makeImages: end');

    console.log('> [makeStatic]: makeStatic: end');
}
