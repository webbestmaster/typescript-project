import {useContext} from 'react';
import {Link, generatePath} from 'react-router-dom';

import {appRoute} from '../../component/app/app-route';

import {NavigationContextType} from './navigation-context/navigation-context-type';
import {navigationContext} from './navigation-context/navigation-context';

export function Navigation(): JSX.Element {
    const navigationContextData = useContext<NavigationContextType>(navigationContext);

    return (
        <div>
            <h1>Navigation</h1>

            <Link to={generatePath(appRoute.test.path, {someId: '1'})}>to test</Link>

            <div>{JSON.stringify(navigationContextData, null, 4)}</div>
        </div>
    );
}
