import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App} from '../../www/component/app/app';
import {streamToStringServer} from '../util/stream';
import {navigationReplaceSelector} from '../../www/client-component/navigation/navigation-const';
import {articleReplaceSelector} from '../../www/client-component/article/article-const';
import {ArticleType} from '../article/article-type';
import {getStringFromUnknown} from '../../www/util/type';

import {getNavigationContextData} from './api/ssr-navigation';
import {contentStringBegin, contentStringEnd, contentStringFull, indexHtml} from './ssr-const';
import {makeClientArticleContextData} from './api/srr-article';
import {getTitleSsrReplaceData} from './api/ssr-helper/ssr-title';
import {getMetaRobotsSsrReplaceData} from './api/ssr-helper/ssr-meta-robots';
import {getMetaKeywordsSsrReplaceData} from './api/ssr-helper/ssr-meta-keywords';
import {getMetaDescriptionSsrReplaceData} from './api/ssr-helper/ssr-meta-description';
import {getMetaSeoSsrReplaceData} from './api/ssr-helper/ssr-meta-seo';
import {getCanonicalLinkSsrReplaceData} from './api/ssr-helper/ssr-meta-canonical';
import {getMetaOpenGraphSsrReplaceData} from './api/ssr-helper/ssr-meta-open-graph';
import {getMetaTwitterCardSsrReplaceData} from './api/ssr-helper/ssr-meta-twitter-card';
import {getSchemaMarkupArticleSsrReplaceData} from './api/schema-markup/schema-markup-article';
import {getSchemaMarkupBreadcrumbsSsrReplaceData} from './api/schema-markup/schema-markup-breadcrumbs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, max-statements
export async function getHtmlCallBack(
    request: FastifyRequest<{Params: {slug?: string}}>,
    reply: FastifyReply
): Promise<[string, ArticleType]> {
    reply.type('text/html');

    const {params, raw} = request;
    const slug = getStringFromUnknown(params, 'slug');

    const [navigationData, navigationDataHtmlString] = await getNavigationContextData();
    const [articleData, articleDataHtmlString] = await makeClientArticleContextData(slug);

    const {article, breadcrumbs} = articleData;

    const schemaBreadcrumbsSsrReplaceData = getSchemaMarkupBreadcrumbsSsrReplaceData(article, breadcrumbs);
    const schemaArticleSsrReplaceData = getSchemaMarkupArticleSsrReplaceData(article);
    const titleSsrReplaceData = getTitleSsrReplaceData(article);
    const metaRobotsSsrReplaceData = getMetaRobotsSsrReplaceData(article);
    const metaKeywordsSsrReplaceData = getMetaKeywordsSsrReplaceData(article);
    const metaDescriptionSsrReplaceData = getMetaDescriptionSsrReplaceData(article);
    const metaSeoSsrReplaceData = getMetaSeoSsrReplaceData(article);
    const canonicalLinkSsrReplaceData = getCanonicalLinkSsrReplaceData(article);
    const metaOpenGraphSsrReplaceData = getMetaOpenGraphSsrReplaceData(article);
    const metaTwitterCardSsrReplaceData = getMetaTwitterCardSsrReplaceData(article);

    const pathname: string = raw.url || '/';
    const appStream = ReactDOMServer.renderToStaticNodeStream(
        <App articleData={articleData} navigationData={navigationData} pathname={pathname} />
    );

    const htmlString = await streamToStringServer(appStream);

    if (article.id === '') {
        reply.code(404);
    }

    if (article.hasMetaRobotsNoIndexSeo) {
        reply.header('X-Robots-Tag', 'noindex');
    }

    const html = indexHtml
        .replace(titleSsrReplaceData.selector, titleSsrReplaceData.value)
        .replace(metaRobotsSsrReplaceData.selector, metaRobotsSsrReplaceData.value)
        .replace(metaDescriptionSsrReplaceData.selector, metaDescriptionSsrReplaceData.value)
        .replace(metaKeywordsSsrReplaceData.selector, metaKeywordsSsrReplaceData.value)
        .replace(metaSeoSsrReplaceData.selector, metaSeoSsrReplaceData.value)
        .replace(canonicalLinkSsrReplaceData.selector, canonicalLinkSsrReplaceData.value)
        .replace(metaOpenGraphSsrReplaceData.selector, metaOpenGraphSsrReplaceData.value)
        .replace(metaTwitterCardSsrReplaceData.selector, metaTwitterCardSsrReplaceData.value)
        .replace(schemaBreadcrumbsSsrReplaceData.selector, schemaBreadcrumbsSsrReplaceData.value)
        .replace(schemaArticleSsrReplaceData.selector, schemaArticleSsrReplaceData.value)

        .replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''))
        .replace(navigationReplaceSelector, navigationDataHtmlString)
        .replace(articleReplaceSelector, articleDataHtmlString);

    return [html, article];
}
