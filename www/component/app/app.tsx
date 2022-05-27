import {StrictMode} from 'react';

import {ErrorBoundary} from '../error-boundary/error-boundary';

import {NavigationContextType} from '../../client-component/navigation/navigation-context/navigation-context-type';
import {ArticleContextType} from '../../client-component/article/article-context/article-context-type';
import {ShareButtonSprite} from '../../client-component/share/share-button/share-button-sprite';

import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export type AppPropsType = {
    articleData: ArticleContextType | null;
    navigationData: NavigationContextType | null;
    pathname: string;
};

export function App(props: AppPropsType): JSX.Element {
    const {pathname, navigationData, articleData} = props;

    return (
        <StrictMode>
            <ErrorBoundary errorFallBack={<h1>Front-end error</h1>}>
                <AppProvider articleData={articleData} navigationData={navigationData}>
                    <AppRouting pathname={pathname} />
                </AppProvider>
            </ErrorBoundary>
            <ShareButtonSprite />
        </StrictMode>
    );
}
