import fileSystem from 'fs';

import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App, AppPropsServerType} from '../../www/component/app/app';
import {defaultServerDataContextConst} from '../../www/provider/server-data/server-data-context-const';
import {ServerDataContextType} from '../../www/provider/server-data/server-data-context-type';
import {streamToString} from '../util/stream';

const contentStringBegin = '<div class="js-app-wrapper">';
const contentStringEnd = '</div>';
const contentStringFull = contentStringBegin + contentStringEnd;

// eslint-disable-next-line no-sync
const indexHtml: string = fileSystem.readFileSync('./dist/index.html', 'utf8');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function getHtmlCallBack(request: FastifyRequest, reply: FastifyReply) {
    reply.type('text/html');

    const server: AppPropsServerType = {
        defaultRoutingPathname: request.raw.url || '/',
    };

    const serverData: ServerDataContextType = defaultServerDataContextConst;

    const appStream = ReactDOMServer.renderToStaticNodeStream(<App server={server} serverData={serverData} />);

    const htmlString = await streamToString(appStream);

    return indexHtml.replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''));
}
