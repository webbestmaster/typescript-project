import {type JSX, useContext} from "react";

import {ArticleTypeEnum} from "../../../server/article/article-type";
import {NeverError} from "../../util/error";
import {articleContext} from "./article-context/article-context";
import type {ArticleContextType} from "./article-context/article-context-type";
import {ArticleArticle} from "./article-type/article-article";
import {ArticleAudioChildrenList} from "./article-type/article-audio-children-list";
import {ArticleAudioList} from "./article-type/article-audio-list";
import {ArticleAudioSingle} from "./article-type/article-audio-single";
import {ArticleContainer} from "./article-type/article-container";

export function Article(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {articleType} = article;

    switch (articleType) {
        case ArticleTypeEnum.article: {
            return <ArticleArticle />;
        }
        case ArticleTypeEnum.container: {
            return <ArticleContainer />;
        }
        case ArticleTypeEnum.audioChildrenList: {
            return <ArticleAudioChildrenList />;
        }
        case ArticleTypeEnum.audioSingle: {
            return <ArticleAudioSingle />;
        }
        case ArticleTypeEnum.audioList: {
            return <ArticleAudioList />;
        }
        default: {
            throw new NeverError(articleType);
        }
    }

    return <ArticleArticle />;
}
