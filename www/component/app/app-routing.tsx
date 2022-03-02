import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

import {Home} from '../../page/client/home/home';
import {InfoAsync} from '../../page/client/info/info-async';
import {Error404} from '../../page/service/error-404/error-404';
import {isBrowser} from '../../util/system';
import {LoginAsync} from '../../page/service/login/login-async';

import {ArticleListAsync} from '../../page/cms/article-list/article-list-async';

import {appRoute} from './app-route';

type PropsType = {
    server: {
        defaultRoutingPathname: string;
    };
};

export function AppRouting(props: PropsType): JSX.Element {
    const {server} = props;

    const switchNode = (
        <Routes>
            <Route element={<Home />} path={appRoute.root.path} />
            <Route element={<InfoAsync />} path={appRoute.info.path} />

            <Route element={<LoginAsync />} path={appRoute.login.path} />

            <Route element={<ArticleListAsync />} path={appRoute.articleList.path} />

            <Route element={<Error404 />} path="*" />
        </Routes>
    );

    if (isBrowser) {
        return <BrowserRouter>{switchNode}</BrowserRouter>;
    }

    return <StaticRouter location={server.defaultRoutingPathname}>{switchNode}</StaticRouter>;
}
