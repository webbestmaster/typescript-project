import {Routes} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

import {Home} from '../../page/home/home';
import {AsyncInfo} from '../../page/info/info-async';
import {Error404} from '../../page/error-404/error-404';
import {isBrowser} from '../../util/system';

import {appRoute} from './app-route';

export function AppRouting(): JSX.Element {
    const switchNode = (
        <Routes>
            <Route element={<Home />} path={appRoute.root.path} />
            <Route element={<AsyncInfo />} path={appRoute.info.path} />

            <Route element={<Error404 />} path="*" />
        </Routes>
    );

    return isBrowser ? (
        <BrowserRouter>{switchNode}</BrowserRouter>
    ) : (
        <StaticRouter location="/">{switchNode}</StaticRouter>
    );
}
