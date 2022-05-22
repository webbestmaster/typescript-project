/* global NAVIGATION_DATA */
import {createContext} from 'react';

import {isBrowser} from '../../../util/system';

import {NavigationContextType} from './navigation-context-type';
import {defaultNavigationContextData} from './navigation-context-const';

export const navigationContext = createContext<NavigationContextType>(defaultNavigationContextData);

const {Provider} = navigationContext;

type NavigationProviderPropsType = {
    children: Array<JSX.Element> | JSX.Element;
    navigationData: NavigationContextType | null;
};

export function NavigationProvider(props: NavigationProviderPropsType): JSX.Element {
    const {children, navigationData} = props;

    if (isBrowser) {
        const ssrNavigationData: NavigationContextType | null =
            typeof NAVIGATION_DATA === 'object' ? NAVIGATION_DATA : null;

        // get data from window global object
        return <Provider value={ssrNavigationData || defaultNavigationContextData}>{children}</Provider>;
    }

    return <Provider value={navigationData || defaultNavigationContextData}>{children}</Provider>;
}
