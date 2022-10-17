import {useContext} from 'react';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';
import articleStyle from '../article.scss';
import {ArticlePreviewList} from '../../article-preview-list/article-preview-list';

export function ArticleContainer(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, subDocumentListViewType} = article;

    return (
        <>
            <ArticlePreviewList childList={childList} previewStyle={subDocumentListViewType} />
            <Markdown className={articleStyle.article_markdown} mdInput={content} />
        </>
    );
}
