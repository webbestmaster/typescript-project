import {useContext} from 'react';

import {NavigationContextType} from './navigation-context/navigation-context-type';
import {navigationContext} from './navigation-context/navigation-context';

export function Navigation(): JSX.Element {
    const navigationContextData = useContext<NavigationContextType>(navigationContext);

    return (
        <div>
            <h1>Navigation</h1>
            <div>{JSON.stringify(navigationContextData, null, 4)}</div>
        </div>
    );
}
