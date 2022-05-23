import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App} from '../../www/component/app/app';
import {streamToString} from '../util/stream';
import {
    navigationReplaceSelector,
    navigationReplaceSelectorBegin,
    navigationReplaceSelectorEnd,
    navigationSsrFieldName,
} from '../../www/layout/navigation/navigation-const';
import {NavigationContextType} from '../../www/layout/navigation/navigation-context/navigation-context-type';

import {getNavigationContextData} from './api/ssr-navigation';
import {contentStringBegin, contentStringEnd, contentStringFull, indexHtml} from './ssr-const';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function getHtmlCallBack(request: FastifyRequest, reply: FastifyReply) {
    reply.type('text/html');

    const navigationData: NavigationContextType = await getNavigationContextData();
    const navigationDataHtmlString: string = [
        navigationReplaceSelectorBegin,
        `window.${navigationSsrFieldName} = ${JSON.stringify(navigationData)}`,
        navigationReplaceSelectorEnd,
    ].join('');

    const pathname: string = request.raw.url || '/';
    const appStream = ReactDOMServer.renderToStaticNodeStream(
        <App navigationData={navigationData} pathname={pathname} />
    );

    const htmlString = await streamToString(appStream);

    return indexHtml
        .replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''))
        .replace(navigationReplaceSelector, navigationDataHtmlString);
}
