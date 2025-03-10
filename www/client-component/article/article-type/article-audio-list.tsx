import {type JSX, useContext} from "react";
import {AudioPlayer, type TrackType} from "react-audio-player-pro";

import {defaultMediaMetadata} from "../../../layout/audio-player/audio-player-const";
import {Markdown} from "../../../layout/markdown/markdown";
import {markdownAudioRegExp, parseAudioTag} from "../../../layout/markdown/markdown-helper-audio";
import {getPathToFile} from "../../../util/path";
import * as articleStyle from "../article.scss";
import {articleContext} from "../article-context/article-context";
import type {ArticleContextType} from "../article-context/article-context-type";

export function ArticleAudioList(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    const splitTextList: Array<string> = content.split(markdownAudioRegExp);
    // eslint-disable-next-line sonarjs/prefer-regexp-exec
    const audioList: Array<string> = content.match(markdownAudioRegExp) ?? [];

    const trackList: Array<TrackType> = audioList.map<TrackType>((audioTag: string): TrackType => {
        const {duration, title: trackTitle, fileName} = parseAudioTag(audioTag);

        return {
            content: trackTitle,
            duration,
            mediaMetadata: defaultMediaMetadata,
            preload: duration ? "none" : "metadata",
            src: getPathToFile(fileName),
        };
    });

    return (
        <>
            <AudioPlayer trackList={trackList} />

            <Markdown
                articleTitle={title}
                className={articleStyle.article_markdown}
                mdInput={splitTextList.join("\n")}
            />
        </>
    );
}
