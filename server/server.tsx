/* global process */

import {promises as fileSystem} from 'fs';
import path from 'path';

import fastifyStatic from 'fastify-static';
import fastifyConstructor, {FastifyRequest, FastifyReply} from 'fastify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {FastifyError} from 'fastify-error';

import {App, AppPropsType} from '../www/component/app/app';

const cwd = process.cwd();

console.warn('server');

const appProps: AppPropsType = {
    server: {defaultRoutingPathname: '/'},
};

const serverPort = 3000;

const contentStringBegin = '<div class="js-app-wrapper">';
const contentStringEnd = '</div>';
const contentStringFull = contentStringBegin + contentStringEnd;

// console.warn(ReactDOMServer.renderToString(<App server={appProps.server}/>));

(async () => {
    const indexHtml: string = await fileSystem.readFile('./dist/index.html', 'utf-8');

    function getHtmlStringByRequest(request: FastifyRequest): string {
        const htmlString = ReactDOMServer.renderToStaticMarkup(<App server={appProps.server} />);

        return indexHtml.replace(contentStringFull, [contentStringBegin, htmlString, contentStringEnd].join(''));
    }

    const fastify = fastifyConstructor({logger: true});

    fastify.register(fastifyStatic, {
        prefix: '/', // optional: default '/'
        root: path.join(cwd, 'dist'),
    });

    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
        reply.type('text/html');

        // throw new Error('asd');

        return getHtmlStringByRequest(request);
    });

    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        request.log.warn(error);

        const {statusCode = 500, message} = error;

        // const endStatusCode = statusCode >= 400 ? statusCode : 500

        reply
            .code(statusCode)
            .type('text/plain')
            .send(statusCode >= 500 ? 'Custom Internal server error' : message);
    });

    fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
        reply.code(404).type('text/plain').send('a custom not found');
    });

    await fastify.listen(serverPort);

    // console.log(htmlString);
})();

/*
const hostname = '127.0.0.1';

const html = '<!DOCTYPE html><html lang="en"><head><meta name="format-detection" content="telephone=no"/><title>typescript app</title><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1"/><meta http-equiv="X-UA-Compatible" content="ie=edge"/><script defer="defer" src="/static/index.js?7d8a2acb280051c9b565"></script><link href="/static/style.css?7d8a2acb280051c9b565" rel="stylesheet"></head><body><div class="js-app-wrapper">{data}</div></body></html>';
*/

/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.end('Hello World');
    res.end(html.replace('{data}', htmlString));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/
