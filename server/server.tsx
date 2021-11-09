// const http = require('http');

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {App} from '../www/component/app/app';

console.warn('server');

// const htmlString = ReactDOMServer.renderToStaticMarkup(<App/>);

console.warn(ReactDOMServer.renderToString(<App />));

/*
const hostname = '127.0.0.1';
const port: number = 3000;

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
