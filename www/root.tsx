/* global document */

import {hydrate, render} from 'react-dom';

import {selector} from './const';
import {App, AppPropsType} from './component/app/app';
import {defaultServerDataContextConst} from './provider/server-data/server-data-context-const';

(function main() {
    const nodeWrapper = document.querySelector(selector.appWrapper);
    const appProps: AppPropsType = {
        server: {
            defaultRoutingPathname: '',
        },
        serverData: defaultServerDataContextConst,
    };

    if (!nodeWrapper) {
        throw new Error('[main]: Can not find appWrapper');
    }

    const {innerHTML} = nodeWrapper;

    const appNode = <App server={appProps.server} serverData={appProps.serverData} />;

    if (innerHTML.trim() === '') {
        console.log('[main]: Render App as SPA');
        render(appNode, nodeWrapper);
        return;
    }

    console.log('[main]: Render App as SSR');
    hydrate(appNode, nodeWrapper);
})();
