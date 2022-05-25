/* global NAVIGATION_DATA */
import {createContext} from 'react';

import {isBrowser} from '../../../util/system';
import {navigationScriptSelector} from '../navigation-const';
import {removeBySelector} from '../../../util/dom';

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

    const ssrNavigationData: NavigationContextType | null =
        typeof NAVIGATION_DATA === 'string' ? JSON.parse(NAVIGATION_DATA) : null;

    removeBySelector(navigationScriptSelector);

    const resultData: NavigationContextType =
        (isBrowser ? ssrNavigationData : navigationData) || defaultNavigationContextData;

    return <Provider value={resultData}>{children}</Provider>;
}
