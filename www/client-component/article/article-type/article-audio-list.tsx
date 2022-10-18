import {useContext} from 'react';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';
import articleStyle from '../article.scss';
import {getFileMarkdownByFullInfo} from '../../../page/cms/cms-article/cms-article-helper';
import {ArticlePreviewType} from '../../../../server/article/article-type';

export function ArticleAudioList(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, titleImage} = article;

    return (
        <>
            <Markdown className={articleStyle.article_markdown} mdInput={getFileMarkdownByFullInfo(titleImage)} />
            {childList.map((articleChild: ArticlePreviewType): JSX.Element => {
                return <div key={articleChild.slug}>{articleChild.slug}</div>;
            })}
            <Markdown className={articleStyle.article_markdown} mdInput={content} />;
        </>
    );
}
