import {
    BrowserRouter,
    Route,
    Routes,
    // useParams, generatePath
} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

import {Home} from '../../page/client/home/home';
import {InfoAsync} from '../../page/client/info/info-async';
import {Error404} from '../../page/service/error-404/error-404';
import {isBrowser} from '../../util/system';
import {LoginAsync} from '../../page/service/login/login-async';
import {TestUseDeferredValue} from '../../page/client/test/use-deferred-value';
import {CmsArticleListAsync} from '../../page/cms/cms-article-list/cms-article-list-async';
import {TestUseDeferredValueSecond} from '../../page/client/test/use-deferred-value-second';
import {CmsArticleCreateAsync} from '../../page/cms/cms-article/cms-article-create/cms-article-create-async';
import {CmsArticleEditAsync} from '../../page/cms/cms-article/cms-article-edit/cms-article-edit-async';

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
            <Route element={<TestUseDeferredValue />} path={appRoute.testUseDeferredValue.path} />
            <Route element={<TestUseDeferredValueSecond />} path={appRoute.testUseDeferredValueSecond.path} />

            <Route element={<LoginAsync />} path={appRoute.login.path} />

            <Route element={<CmsArticleListAsync />} path={appRoute.articleList.path} />

            <Route element={<CmsArticleCreateAsync />} path={appRoute.articleCreate.path} />
            <Route element={<CmsArticleEditAsync />} path={appRoute.articleEdit.path} />

            <Route element={<Error404 />} path="*" />
        </Routes>
    );

    if (isBrowser) {
        return <BrowserRouter>{switchNode}</BrowserRouter>;
    }

    return <StaticRouter location={server.defaultRoutingPathname}>{switchNode}</StaticRouter>;
}
