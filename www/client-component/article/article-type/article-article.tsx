import {useContext} from "react";

import type {ArticleContextType} from "../article-context/article-context-type";
import {articleContext} from "../article-context/article-context";
import {Markdown} from "../../../layout/markdown/markdown";

import articleStyle from "../article.scss";

export function ArticleArticle(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    return <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />;
}
