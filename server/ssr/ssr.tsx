import fileSystem from 'fs';

import {FastifyRequest, FastifyReply} from 'fastify';
import ReactDOMServer from 'react-dom/server';

import {App, AppPropsServerType} from '../../www/component/app/app';
import {defaultServerDataContextConst} from '../../www/provider/server-data/server-data-context-const';
import {ServerDataContextType} from '../../www/provider/server-data/server-data-context-type';

const contentStringBegin = '<div class="js-app-wrapper">';
const contentStringEnd = '</div>';
const contentStringFull = contentStringBegin + contentStringEnd;

// eslint-disable-next-line no-sync
const indexHtml: string = fileSystem.readFileSync('./dist/index.html', 'utf8');

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function getHtmlStringByRequest(request: FastifyRequest): string {
    const server: AppPropsServerType = {
        defaultRoutingPathname: request.raw.url || '/',
    };

    const serverData: ServerDataContextType = defaultServerDataContextConst;

    const htmlString = ReactDOMServer.renderToStaticMarkup(<App server={server} serverData={serverData} />);

    return indexHtml.replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''));
}

export async function getHtmlCallBack(request: FastifyRequest, reply: FastifyReply): Promise<string> {
    reply.type('text/html');

    return getHtmlStringByRequest(request);
}
