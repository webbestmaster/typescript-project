import {useContext} from "react";
import {type TrackType, AudioPlayer} from "react-audio-player-pro";
import {Link} from "react-router-dom";

import type {ArticleContextType} from "../article-context/article-context-type";
import {articleContext} from "../article-context/article-context";
import {Markdown} from "../../../layout/markdown/markdown";
import {getFileMarkdownByFullInfo} from "../../../layout/markdown/markdown-helper";
import {
    type ArticleFileType,
    ArticleFileTypeEnum,
    type ArticlePreviewType,
} from "../../../../server/article/article-type";
import {getArticleLinkToViewClient} from "../article-helper";
import {defaultMediaMetadata} from "../../../layout/audio-player/audio-player-const";
import audioPlayerStyle from "../../../layout/audio-player/audio-player.scss";
import {getPathToFile} from "../../../util/path";
import articleStyle from "../article.scss";

export function ArticleAudioChildrenList(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, titleImage, title} = article;
    const trackList: Array<TrackType> = [];

    childList.forEach((articleChild: ArticlePreviewType) => {
        const {title: childTitle, slug, fileList} = articleChild;

        fileList
            .filter<ArticleFileType>((fileInfo: ArticleFileType): fileInfo is ArticleFileType => {
                return fileInfo.type === ArticleFileTypeEnum.audio;
            })
            .forEach((fileInfo: ArticleFileType, index: number) => {
                const {name, duration} = fileInfo;
                const titleIndex = index > 0 ? ` (${(index + 1).toString(10)})` : "";
                const endTitle = `${childTitle}${titleIndex}`;

                const track: TrackType = {
                    content: (
                        <Link className={audioPlayerStyle.audio_player_list_link} to={getArticleLinkToViewClient(slug)}>
                            {endTitle}
                        </Link>
                    ),
                    duration,
                    mediaMetadata: {...defaultMediaMetadata, title: endTitle},
                    preload: duration ? "none" : "metadata",
                    src: getPathToFile(name),
                };

                trackList.push(track);
            });
    });

    return (
        <>
            <Markdown
                articleTitle={title}
                className={articleStyle.article_markdown}
                mdInput={getFileMarkdownByFullInfo(titleImage, {alt: title, poster: ""})}
            />
            <AudioPlayer className={articleStyle.article_audio_player} trackList={trackList} />
            <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />
        </>
    );
}
