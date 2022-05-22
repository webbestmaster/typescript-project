import fileSystem from 'fs';

import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App} from '../../www/component/app/app';
import {streamToString} from '../util/stream';
import {navigationReplaceSelector, navigationSsrFieldName} from '../../www/layout/navigation/navigation-const';
import {NavigationContextType} from '../../www/layout/navigation/navigation-context/navigation-context-type';

const contentStringBegin = '<div class="js-app-wrapper">';
const contentStringEnd = '</div>';
const contentStringFull = contentStringBegin + contentStringEnd;

// eslint-disable-next-line no-sync
const indexHtml: string = fileSystem.readFileSync('./dist/index.html', 'utf8');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function getHtmlCallBack(request: FastifyRequest, reply: FastifyReply) {
    reply.type('text/html');

    const navigationData: NavigationContextType = {
        itemList: [
            {
                href: '/',
                title: 'ssr',
            },
            {
                href: '/22',
                title: 'home',
            },
        ],
    };

    const pathname: string = request.raw.url || '/';
    const appStream = ReactDOMServer.renderToStaticNodeStream(
        <App navigationData={navigationData} pathname={pathname} />
    );

    const htmlString = await streamToString(appStream);

    return indexHtml
        .replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''))
        .replace(
            navigationReplaceSelector,
            `<script>window.${navigationSsrFieldName} = ${JSON.stringify(navigationData)}</script>`
        );
}
