import {
    BrowserRouter,
    Route,
    Routes,
    // useParams, generatePath
} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

import {isBrowser} from '../../util/system';
import {Home} from '../../page/client/home/home';
import {Error404} from '../../page/service/error-404/error-404';
import {LoginAsync} from '../../page/service/login/login-async';
import {CmsArticleListAsync} from '../../page/cms/cms-article-list/cms-article-list-async';
import {CmsArticleTreeAsync} from '../../page/cms/cms-article-tree/cms-article-tree-async';
import {CmsArticleCreateAsync} from '../../page/cms/cms-article/cms-article-create/cms-article-create-async';
import {CmsArticleEditAsync} from '../../page/cms/cms-article/cms-article-edit/cms-article-edit-async';
import {Article} from '../../page/client/article/article';

import {appRoute} from './app-route';

type PropsType = {
    pathname: string;
};

export function AppRouting(props: PropsType): JSX.Element {
    const switchNode = (
        <Routes>
            <Route element={<Home />} path={appRoute.root.path} />
            <Route element={<Article />} path={appRoute.article.path} />

            <Route element={<LoginAsync />} path={appRoute.login.path} />

            <Route element={<CmsArticleListAsync />} path={appRoute.articleList.path} />
            <Route element={<CmsArticleTreeAsync />} path={appRoute.articleTree.path} />
            <Route element={<CmsArticleCreateAsync />} path={appRoute.articleCreate.path} />
            <Route element={<CmsArticleEditAsync />} path={appRoute.articleEdit.path} />

            <Route element={<Error404 />} path="*" />
        </Routes>
    );

    if (isBrowser) {
        return <BrowserRouter>{switchNode}</BrowserRouter>;
    }

    const {pathname} = props;

    return <StaticRouter location={pathname}>{switchNode}</StaticRouter>;
}
