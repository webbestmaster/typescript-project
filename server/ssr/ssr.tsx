import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App} from '../../www/component/app/app';
import {streamToStringServer} from '../util/stream';
import {navigationReplaceSelector} from '../../www/client-component/navigation/navigation-const';
import {articleReplaceSelector} from '../../www/client-component/article/article-const';

import {getNavigationContextData} from './api/ssr-navigation';
import {contentStringBegin, contentStringEnd, contentStringFull, indexHtml} from './ssr-const';
import {makeClientArticleContextData} from './api/srr-article';
import {getTitleSsrReplaceData} from './api/ssr-helper/ssr-title';
import {getMetaRobotsSsrReplaceData} from './api/ssr-helper/ssr-meta-robots';
import {getMetaKeywordsSsrReplaceData} from './api/ssr-helper/ssr-meta-keywords';
import {getMetaDescriptionSsrReplaceData} from './api/ssr-helper/ssr-meta-description';
import {getMetaSeoSsrReplaceData} from './api/ssr-helper/ssr-meta-seo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function getHtmlCallBack(
    request: FastifyRequest<{Body: string; Params?: {slug: string}}>,
    reply: FastifyReply
) {
    reply.type('text/html');

    const {params, raw} = request;
    const slug = params?.slug || '';

    const [navigationData, navigationDataHtmlString] = await getNavigationContextData();
    const [articleData, articleDataHtmlString] = await makeClientArticleContextData(slug);
    const titleSsrReplaceData = getTitleSsrReplaceData(articleData.article);
    const metaRobotsSsrReplaceData = getMetaRobotsSsrReplaceData(articleData.article);
    const metaKeywordsSsrReplaceData = getMetaKeywordsSsrReplaceData(articleData.article);
    const metaDescriptionSsrReplaceData = getMetaDescriptionSsrReplaceData(articleData.article);
    const metaSeoSsrReplaceData = getMetaSeoSsrReplaceData(articleData.article);

    const pathname: string = raw.url || '/';
    const appStream = ReactDOMServer.renderToStaticNodeStream(
        <App articleData={articleData} navigationData={navigationData} pathname={pathname} />
    );

    const htmlString = await streamToStringServer(appStream);

    if (articleData.article.id === '') {
        reply.code(404);
    }

    if (articleData.article.hasMetaRobotsNoIndexSeo) {
        reply.header('X-Robots-Tag', 'noindex');
    }

    return indexHtml
        .replace(titleSsrReplaceData.selector, titleSsrReplaceData.value)
        .replace(metaRobotsSsrReplaceData.selector, metaRobotsSsrReplaceData.value)
        .replace(metaDescriptionSsrReplaceData.selector, metaDescriptionSsrReplaceData.value)
        .replace(metaKeywordsSsrReplaceData.selector, metaKeywordsSsrReplaceData.value)
        .replace(metaSeoSsrReplaceData.selector, metaSeoSsrReplaceData.value)
        .replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''))
        .replace(navigationReplaceSelector, navigationDataHtmlString)
        .replace(articleReplaceSelector, articleDataHtmlString);
}
