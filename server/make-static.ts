/* global process, fetch, Response, Buffer */
import {createWriteStream} from 'node:fs';
import fileSystem from 'node:fs/promises';
import path from 'node:path';

import {getArticleLinkToViewClient} from '../www/client-component/article/article-helper';
import {generatePath, paginationQueryToURLSearchParameters} from '../www/util/url';
import {appRoute} from '../www/component/app/app-route';
import {appIconPngFileName, companyLogoPngFileName, companyLogoPngHeight, companyLogoPngWidth} from '../www/const';
import {getPathToImage} from '../www/util/path';
import {articlePreviewKeyList} from '../www/client-component/search/search-const';
// import {takeTimeLog} from '../www/util/time';
import {TaskRunner, TaskRunnerOnTaskDoneArgumentType} from '../www/util/task-runner';
import {formatProgress} from '../www/util/string';
import {logTakenTime} from '../www/util/time';

import {articleCrud} from './article/article';
import {ArticleType} from './article/article-type';
import {uploadFileFolder} from './file/file-const';
import {apiUrl, serverPort} from './const';
import {rootArticleSlug} from './article/article-const';
import {makeDirectory, tryToMakeDirectorySilent} from './file/directory';

const staticSiteFolderName = 'static-site';
const mainUrl = `http://127.0.0.1:${serverPort}`;

const cwd = process.cwd();
const maxWorkerCount = 8;

type StaticPageType = Readonly<{
    html: string;
    slug: string;
}>;

type ImageUrlType = Readonly<{
    slug: string;
    url: string;
}>;

class StaticSite {
    private readonly pageList: Array<StaticPageType> = [];

    @logTakenTime('>>', 'StaticSite')
    private async copyStaticFileFolder(): Promise<void> {
        await makeDirectory(cwd, staticSiteFolderName);

        await fileSystem.cp(path.join(cwd, uploadFileFolder), path.join(cwd, staticSiteFolderName, uploadFileFolder), {
            recursive: true,
        });
    }

    @logTakenTime('>>', 'StaticSite')
    private async collectHtmlPages(): Promise<void> {
        const {log} = console;
        const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true, isInSiteMapXmlSeo: true});

        const slugList = articleList.map<string>((article: ArticleType): string => {
            return article.slug;
        });

        const pageList: Array<StaticPageType> = [];

        const progressCounterMax: number = slugList.length;
        const taskRunner = new TaskRunner({
            maxWorkerCount,
            onTaskEnd: (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => {
                const {restTaskCount, taskInProgressCount} = taskRunnerData;
                const progressCount = progressCounterMax - restTaskCount - taskInProgressCount;

                log(`>> >> [makeStatic]: collectHtmlPages: ${formatProgress(progressCount, progressCounterMax)}`);
            },
        });

        const taskPromiseList: Array<Promise<unknown>> = slugList.map<Promise<unknown>>(
            (slug: string): Promise<unknown> => {
                return taskRunner.add(async () => {
                    pageList.push(await this.getStaticPage(slug));
                });
            }
        );

        await Promise.all(taskPromiseList);

        this.pageList.push(...pageList);
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeHtmlPages(): Promise<void> {
        const {log} = console;

        await makeDirectory(cwd, staticSiteFolderName, 'article');

        const progressCounterMax: number = this.pageList.length;
        const taskRunner = new TaskRunner({
            maxWorkerCount,
            onTaskEnd: (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => {
                const {restTaskCount, taskInProgressCount} = taskRunnerData;
                const progressCount = progressCounterMax - restTaskCount - taskInProgressCount;

                log(`>> >> [makeStatic]: makeHtmlPages: ${formatProgress(progressCount, progressCounterMax)}`);
            },
        });

        // write html files
        const taskPromiseList: Array<Promise<unknown>> = this.pageList.map<Promise<unknown>>(
            (page: StaticPageType): Promise<unknown> => {
                return taskRunner.add(async () => {
                    const htmlPath =
                        generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug: page.slug}) + '.html';

                    await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, htmlPath), page.html);
                });
            }
        );

        await Promise.all(taskPromiseList);
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeServicePages(): Promise<void> {
        await makeDirectory(cwd, staticSiteFolderName);

        const html404 = await this.getTextFromUrl(mainUrl + '/404');

        await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, '404.html'), html404);
    }

    private async getTextFromUrl(fullUrl: string): Promise<string> {
        const response = await fetch(fullUrl);

        return response.text();
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeApiArticle(): Promise<void> {
        const {log} = console;

        await makeDirectory(cwd, staticSiteFolderName, 'api');
        // eslint-disable-next-line sonarjs/no-duplicate-string
        await makeDirectory(cwd, staticSiteFolderName, 'api', 'client-article');

        const progressCounterMax: number = this.pageList.length;
        const taskRunner = new TaskRunner({
            maxWorkerCount,
            onTaskEnd: (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => {
                const {restTaskCount, taskInProgressCount} = taskRunnerData;
                const progressCount = progressCounterMax - restTaskCount - taskInProgressCount;

                log(`>> >> [makeStatic]: makeApiArticle: ${formatProgress(progressCount, progressCounterMax)}`);
            },
        });

        // write html files
        const taskPromiseList: Array<Promise<unknown>> = this.pageList.map<Promise<unknown>>(
            (page: StaticPageType): Promise<unknown> => {
                return taskRunner.add(async () => {
                    const apiPath = generatePath<typeof apiUrl.clientArticleContextGet>(
                        apiUrl.clientArticleContextGet,
                        {
                            slug: page.slug,
                        }
                    );
                    const data = await this.getTextFromUrl(mainUrl + apiPath);

                    await fileSystem.writeFile(
                        path.join(cwd, staticSiteFolderName, 'api', 'client-article', page.slug),
                        data
                    );
                });
            }
        );

        await Promise.all(taskPromiseList);
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeApiArticleSearch() {
        await makeDirectory(cwd, staticSiteFolderName, 'api');
        await makeDirectory(cwd, staticSiteFolderName, 'api', 'client-article');

        const querySearchParameters = paginationQueryToURLSearchParameters<ArticleType>(
            {},
            {pageIndex: 0, pageSize: 0, sort: {title: 1}},
            articlePreviewKeyList
        );

        const apiPath = `${apiUrl.clientSearchArticle}?${querySearchParameters}`;

        const data = await this.getTextFromUrl(mainUrl + apiPath);

        await fileSystem.writeFile(
            path.join(cwd, staticSiteFolderName, 'api', 'client-article', 'pagination-pick'),
            data
        );
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeIcons(): Promise<void> {
        const {log} = console;

        await makeDirectory(cwd, staticSiteFolderName, 'api-image');

        const appIconSizeList: Array<number> = [
            // manifest.json, check in manifest.json
            36, 48, 72, 96, 144, 192, 512, 1024, 2048,
            // apple icon, check in index.html
            57, 60, 72, 76, 114, 120, 144, 152, 180,
        ];

        const progressCounterMax: number = appIconSizeList.length;

        const taskRunner = new TaskRunner({
            maxWorkerCount,
            onTaskEnd: (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => {
                const {restTaskCount, taskInProgressCount} = taskRunnerData;
                const progressCount = progressCounterMax - restTaskCount - taskInProgressCount;

                log(`>> >> [makeStatic]: makeIcons: ${formatProgress(progressCount, progressCounterMax)}`);
            },
        });

        const taskPromiseList: Array<Promise<unknown>> = appIconSizeList.map<Promise<unknown>>(
            (iconSize: number): Promise<unknown> => {
                return taskRunner.add(async () => {
                    const sizeFolderName = `${iconSize}x${iconSize}`;

                    await tryToMakeDirectorySilent(cwd, staticSiteFolderName, 'api-image', sizeFolderName);

                    const iconImagePath = getPathToImage(appIconPngFileName, {height: iconSize, width: iconSize});
                    const responseIcon: Response = await fetch(mainUrl + iconImagePath);
                    const responseIconArrayBuffer = await responseIcon.arrayBuffer();
                    const responseIconBuffer = Buffer.from(responseIconArrayBuffer);

                    createWriteStream(path.join(cwd, staticSiteFolderName, iconImagePath)).write(responseIconBuffer);
                });
            }
        );

        await Promise.all(taskPromiseList);
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeCompanyLogo(): Promise<void> {
        await makeDirectory(cwd, staticSiteFolderName, 'api-image');
        await makeDirectory(cwd, staticSiteFolderName, 'api-image', `${companyLogoPngWidth}x${companyLogoPngHeight}`);

        const companyLogoPath = getPathToImage(companyLogoPngFileName, {
            height: companyLogoPngHeight,
            width: companyLogoPngWidth,
        });
        const responseLogo: Response = await fetch(mainUrl + companyLogoPath);
        const responseLogoArrayBuffer = await responseLogo.arrayBuffer();
        const responseLogoBuffer = Buffer.from(responseLogoArrayBuffer);

        createWriteStream(path.join(cwd, staticSiteFolderName, companyLogoPath)).write(responseLogoBuffer);
    }

    // eslint-disable-next-line max-statements
    @logTakenTime('>>', 'StaticSite')
    private async makeImages(): Promise<void> {
        const {log} = console;

        await makeDirectory(cwd, staticSiteFolderName, 'api-image');

        const imageUrlList: Array<ImageUrlType> = [];

        this.pageList.forEach((page: StaticPageType) => {
            const {html, slug} = page;
            const urlList: Array<string> = html.match(/\/api-image\/[^\s"]+/gi) || [];

            urlList.forEach((url: string) => {
                imageUrlList.push({slug, url});
            });
        });

        const progressCounterMax: number = imageUrlList.length;
        const taskRunner = new TaskRunner({
            maxWorkerCount,
            onTaskEnd: (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => {
                const {restTaskCount, taskInProgressCount} = taskRunnerData;
                const progressCount = progressCounterMax - restTaskCount - taskInProgressCount;

                log(`>> >> [makeStatic]: makeImages: ${formatProgress(progressCount, progressCounterMax)}`);
            },
        });

        const taskPromiseList: Array<Promise<unknown>> = imageUrlList.map<Promise<unknown>>(
            (imageUrl: ImageUrlType): Promise<unknown> => {
                return taskRunner.add(async () => {
                    const imageUrlChunks = imageUrl.url.split('/');
                    const [ignoredSpace, ignoredImageApiString, imageSize, imageName] = imageUrlChunks;

                    if (!imageName || !imageSize) {
                        log('----------------------------------------');
                        log(`[ERROR]: makeImages: wrong image url, slug / url: ${imageUrl.slug} / ${imageUrl.url}`);
                        return;
                    }

                    await tryToMakeDirectorySilent(cwd, staticSiteFolderName, 'api-image', imageSize);

                    const imageResponse: Response = await fetch(mainUrl + imageUrl.url);

                    if (!imageResponse.ok) {
                        log('----------------------------------------');
                        log(`[ERROR]: makeImages: can not get slug / url: ${imageUrl.slug} / ${imageUrl.url}`);
                        return;
                    }

                    const imageArrayBuffer = await imageResponse.arrayBuffer();
                    const imageBuffer = Buffer.from(imageArrayBuffer);

                    createWriteStream(path.join(cwd, staticSiteFolderName, imageUrl.url)).write(imageBuffer);
                });
            }
        );

        await Promise.all(taskPromiseList);
    }

    @logTakenTime('>>', 'StaticSite')
    private async copyDistributionFolder(): Promise<void> {
        await makeDirectory(cwd, staticSiteFolderName);

        await fileSystem.cp(path.join(cwd, 'dist'), path.join(cwd, staticSiteFolderName), {recursive: true});
    }

    @logTakenTime('>>', 'StaticSite')
    private async makeIndexHtml(): Promise<void> {
        const rootArticle = this.pageList.find((article: StaticPageType): boolean => {
            return article.slug === rootArticleSlug;
        });

        if (!rootArticle) {
            throw new Error(`[ERROR]: makeIndexHtml: can not find root article, slug: ${rootArticleSlug}`);
        }

        await fileSystem.writeFile(path.join(cwd, staticSiteFolderName, 'index.html'), rootArticle.html);
    }

    private async getStaticPage(slug: string): Promise<StaticPageType> {
        const fullPageUrl = mainUrl + getArticleLinkToViewClient(slug);
        const html = await this.getTextFromUrl(fullPageUrl);

        return {html, slug};
    }

    @logTakenTime('>', 'StaticSite')
    public async makeStatic(): Promise<void> {
        await this.copyStaticFileFolder();

        await this.collectHtmlPages();

        await this.makeHtmlPages();

        await this.makeServicePages();

        await this.makeApiArticle();

        await this.makeApiArticleSearch();

        await this.makeIcons();

        await this.makeCompanyLogo();

        await this.makeImages();

        await this.copyDistributionFolder();

        await this.makeIndexHtml();
    }
}

export async function makeStatic() {
    const staticSite = new StaticSite();

    await staticSite.makeStatic();
}
