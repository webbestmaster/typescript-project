/* global ARTICLE_DATA */
import {createContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {isBrowser} from '../../../util/system';
import {articleScriptSelector} from '../article-const';
import {removeBySelector} from '../../../util/dom';
import {ExtractPathKeysType} from '../../../util/url';
import {appRoute} from '../../../component/app/app-route';
import {getArticleContextBySlug} from '../../../service/article/article-api';

import {ArticleContextType} from './article-context-type';
import {defaultArticleContextData} from './article-context-const';

export const articleContext = createContext<ArticleContextType>(defaultArticleContextData);

const {Provider} = articleContext;

type ArticleProviderPropsType = {
    articleData: ArticleContextType | null;
    children: Array<JSX.Element> | JSX.Element;
};

export function ArticleProvider(props: ArticleProviderPropsType): JSX.Element {
    const {children, articleData} = props;
    const defaultParameters = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();
    const [slug, setSlug] = useState<string>(defaultParameters.slug || '');

    console.info('ArticleProvider');

    // TODO: store article by slug to cache
    // TODO: add is article loading
    const ssrArticleData: ArticleContextType | null =
        typeof ARTICLE_DATA === 'string' ? JSON.parse(ARTICLE_DATA) : null;

    useEffect(() => {
        console.info('fetch data about article');
        if (slug.trim()) {
            // eslint-disable-next-line promise/catch-or-return
            getArticleContextBySlug(slug).then(console.info);
        }
    }, [slug]);

    removeBySelector(articleScriptSelector);

    const resultData: ArticleContextType = (isBrowser ? ssrArticleData : articleData) || defaultArticleContextData;

    return <Provider value={{...resultData, setSlug}}>{children}</Provider>;
}
