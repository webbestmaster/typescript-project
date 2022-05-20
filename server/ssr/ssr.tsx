import fileSystem from 'fs';

import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App} from '../../www/component/app/app';
import {streamToString} from '../util/stream';

const contentStringBegin = '<div class="js-app-wrapper">';
const contentStringEnd = '</div>';
const contentStringFull = contentStringBegin + contentStringEnd;

// eslint-disable-next-line no-sync
const indexHtml: string = fileSystem.readFileSync('./dist/index.html', 'utf8');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function getHtmlCallBack(request: FastifyRequest, reply: FastifyReply) {
    reply.type('text/html');

    const pathname: string = request.raw.url || '/';
    // TODO: collect navigation data
    const appStream = ReactDOMServer.renderToStaticNodeStream(<App navigationData={null} pathname={pathname} />);

    const htmlString = await streamToString(appStream);

    /*
    // TODO: add this to render
    <!--  replace it for ssr data  -->
    <meta name="ssr-data"/>

    <script
        type="text/javascript"
        dangerouslySetInnerHTML={{__html: `window.navigationData = ${JSON.stringify({pathname: 11})}`}}
    />
*/

    return indexHtml.replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''));
}
