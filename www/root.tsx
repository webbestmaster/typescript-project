/* global document */

import {hydrate, render} from 'react-dom';

import {selector} from './const';
import {App} from './component/app/app';

(function main() {
    const nodeWrapper = document.querySelector(selector.appWrapper);

    if (!nodeWrapper) {
        throw new Error('[main]: Can not find appWrapper');
    }

    const {innerHTML} = nodeWrapper;

    if (innerHTML.trim() === '') {
        console.log('[main]: Render App as SPA');
        render(<App />, nodeWrapper);
        return;
    }

    console.log('[main]: Render App as SSR');
    hydrate(<App />, nodeWrapper);
})();
