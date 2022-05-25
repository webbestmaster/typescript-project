import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App} from '../../www/component/app/app';
import {streamToString} from '../util/stream';
import {navigationReplaceSelector} from '../../www/client-component/navigation/navigation-const';
import {articleReplaceSelector} from '../../www/client-component/article/article-const';

import {getNavigationContextData} from './api/ssr-navigation';
import {contentStringBegin, contentStringEnd, contentStringFull, indexHtml} from './ssr-const';
import {getClientArticle} from './api/srr-article';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function getHtmlCallBack(
    request: FastifyRequest<{Body: string; Params?: {slug: string}}>,
    reply: FastifyReply
) {
    reply.type('text/html');

    const {params, raw} = request;
    const slug = params?.slug || '';

    const [navigationData, navigationDataHtmlString] = await getNavigationContextData();
    const [articleData, articleDataHtmlString] = await getClientArticle(slug);

    const pathname: string = raw.url || '/';
    const appStream = ReactDOMServer.renderToStaticNodeStream(
        <App articleData={articleData} navigationData={navigationData} pathname={pathname} />
    );

    const htmlString = await streamToString(appStream);

    return indexHtml
        .replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''))
        .replace(navigationReplaceSelector, navigationDataHtmlString)
        .replace(articleReplaceSelector, articleDataHtmlString);
}
