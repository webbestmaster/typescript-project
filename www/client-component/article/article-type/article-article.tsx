import {useContext} from 'react';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';

import articleStyle from '../article.scss';

export function ArticleArticle(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content} = article;

    return <Markdown className={articleStyle.article_markdown} mdInput={content} />;
}
