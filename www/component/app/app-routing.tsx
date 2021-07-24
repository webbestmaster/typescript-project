import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from '../../page/home/home';
import {Error404} from '../../page/error-404/error-404';

import {appRoute} from './app-route';

export function AppRouting(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} exact path={appRoute.root.path} />

                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    );
}
