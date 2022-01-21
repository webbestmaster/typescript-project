import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';

import {Home} from '../../page/home/home';
import {InfoAsync} from '../../page/info/info-async';
import {Error404} from '../../page/error-404/error-404';
import {isBrowser} from '../../util/system';
import {Login} from '../../page/login/login';
import {LoginRequired} from '../../layout/login-required/login-required';

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
            <Route
                element={
                    <LoginRequired>
                        <InfoAsync />
                    </LoginRequired>
                }
                path={appRoute.info.path}
            />

            <Route element={<Login />} path={appRoute.login.path} />

            <Route element={<Error404 />} path="*" />
        </Routes>
    );

    if (isBrowser) {
        return <BrowserRouter>{switchNode}</BrowserRouter>;
    }

    return <StaticRouter location={server.defaultRoutingPathname}>{switchNode}</StaticRouter>;
}
