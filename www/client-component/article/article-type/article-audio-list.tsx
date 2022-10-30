import {useContext} from 'react';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';
import articleStyle from '../article.scss';

export function ArticleAudioList(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    return (
        <>
            <h1>ArticleAudioList, need to implement</h1>
            <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />
        </>
    );
}
