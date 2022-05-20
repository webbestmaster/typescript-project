import {StrictMode} from 'react';

import {ErrorBoundary} from '../error-boundary/error-boundary';

import {NavigationContextType} from '../../layout/navigation/navigation-context/navigation-context-type';

import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export type AppPropsType = {
    navigationData: NavigationContextType | null;
    pathname: string;
};

export function App(props: AppPropsType): JSX.Element {
    const {pathname, navigationData} = props;

    return (
        <StrictMode>
            <ErrorBoundary errorFallBack={<h1>Front-end error</h1>}>
                <AppProvider navigationData={navigationData}>
                    <AppRouting pathname={pathname} />
                </AppProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}
