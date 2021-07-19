import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {SystemProvider} from '../../provider/system/system-context';
import {LocaleProvider} from '../../provider/locale/locale-context';

import {Home} from '../../page/home/home';
import {Error404} from '../../page/error-404/error-404';

import {appRoute} from './app-route';

export function App(): JSX.Element {
    return (
        <SystemProvider>
            <LocaleProvider>
                <BrowserRouter>
                    <Switch>
                        <Route component={Home} exact path={appRoute.root.path} />

                        <Route component={Error404} />
                    </Switch>
                </BrowserRouter>
            </LocaleProvider>
        </SystemProvider>
    );
}
