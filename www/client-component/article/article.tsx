import {useContext} from 'react';

import {ArticleContextType} from './article-context/article-context-type';
import {articleContext} from './article-context/article-context';

export function Article(): JSX.Element {
    const articleContextData = useContext<ArticleContextType>(articleContext);

    console.info(articleContextData);

    return (
        <h1>
            article = {articleContextData.article.slug} - {articleContextData.article.id}
        </h1>
    );
}
