/* global document */

import {hydrateRoot, createRoot} from 'react-dom/client';

import {selector} from './const';
import {App} from './component/app/app';

(function main() {
    const nodeWrapper = document.querySelector(selector.appWrapper);

    if (!nodeWrapper) {
        throw new Error('[main]: Can not find appWrapper');
    }

    const {innerHTML} = nodeWrapper;

    const appNode = <App articleData={null} defaultThemeName={null} navigationData={null} url="" />;

    if (innerHTML.trim() === '') {
        console.log('[main]: Render App as SPA');
        createRoot(nodeWrapper).render(appNode);
        return;
    }

    console.log('[main]: Render App as SSR');
    hydrateRoot(nodeWrapper, appNode);
})();
