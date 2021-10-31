import {BrowserRouter, Route, Switch, StaticRouter} from 'react-router-dom';

import {Home} from '../../page/home/home';
import {AsyncInfo} from '../../page/info/info-async';
import {Error404} from '../../page/error-404/error-404';
import {isBrowser} from '../../util/system';

import {appRoute} from './app-route';

export function AppRouting(): JSX.Element {
    const switchNode = (
        <Switch>
            <Route component={Home} exact path={appRoute.root.path} />
            <Route component={AsyncInfo} exact path={appRoute.info.path} />

            <Route component={Error404} />
        </Switch>
    );

    return isBrowser ? <BrowserRouter>{switchNode}</BrowserRouter> : <StaticRouter>{switchNode}</StaticRouter>;
}
