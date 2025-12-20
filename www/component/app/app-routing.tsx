import type {JSX} from "react";
import {StaticRouter} from "react-router";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Page} from "../../client-component/page/page";
import {ClientArticle} from "../../page/client/client-article/client-article";
import {ClientHome} from "../../page/client/client-home/client-home";
import {Error404} from "../../page/service/error-404/error-404";
import {LoginAsync} from "../../page/service/login/login-async";
import {isBrowser} from "../../util/system";
import {appRoute} from "./app-route";

interface PropsType {
    readonly url: string;
}

export function AppRouting(props: PropsType): JSX.Element {
    const switchNode = (
        <Routes>
            <Route Component={ClientHome} path={appRoute.root.path} />
            <Route Component={ClientArticle} path={appRoute.article.path} />

            <Route Component={LoginAsync} path={appRoute.login.path} />

            <Route
                element={
                    <Page>
                        <Error404 />
                    </Page>
                }
                path="*"
            />
        </Routes>
    );

    if (isBrowser) {
        return <BrowserRouter>{switchNode}</BrowserRouter>;
    }

    const {url} = props;

    return <StaticRouter location={url}>{switchNode}</StaticRouter>;
}
