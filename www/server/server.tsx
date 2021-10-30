import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {App} from '../component/app/app';

console.warn('server');

console.warn(ReactDOMServer.renderToStaticMarkup(<App />));
