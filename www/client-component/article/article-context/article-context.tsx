/* global ARTICLE_DATA */
import {createContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {isBrowser} from '../../../util/system';
import {articleScriptSelector} from '../article-const';
import {removeBySelector} from '../../../util/dom';
import {ExtractPathKeysType} from '../../../util/url';
import {appRoute} from '../../../component/app/app-route';

import {ArticleContextType} from './article-context-type';
import {defaultArticleContextData} from './article-context-const';

export const articleContext = createContext<ArticleContextType>(defaultArticleContextData);

const {Provider} = articleContext;

type NavigationProviderPropsType = {
    articleData: ArticleContextType | null;
    children: Array<JSX.Element> | JSX.Element;
};

export function ArticleProvider(props: NavigationProviderPropsType): JSX.Element {
    const {children, articleData} = props;
    const data = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();

    // TODO: store article by slug to cache
    const ssrArticleData: ArticleContextType | null =
        typeof ARTICLE_DATA === 'string' ? JSON.parse(ARTICLE_DATA) : null;

    useEffect(() => {
        console.info('fetch data about article');
    }, [data]);

    removeBySelector(articleScriptSelector);

    const resultData: ArticleContextType = (isBrowser ? ssrArticleData : articleData) || defaultArticleContextData;

    return <Provider value={resultData}>{children}</Provider>;
}
