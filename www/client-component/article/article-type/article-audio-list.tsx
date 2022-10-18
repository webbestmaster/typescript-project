import {useContext} from 'react';
import {TrackType} from 'react-audio-player-pro';
import {Link} from 'react-router-dom';

import {ArticleContextType} from '../article-context/article-context-type';
import {articleContext} from '../article-context/article-context';
import {Markdown} from '../../../layout/markdown/markdown';
import {getFileMarkdownByFullInfo, getPathToFile} from '../../../page/cms/cms-article/cms-article-helper';
import {ArticleFileType, ArticleFileTypeEnum, ArticlePreviewType} from '../../../../server/article/article-type';
import {getArticleLinkToViewClient} from '../article-helper';
import {AudioPlayerAsync} from '../../../layout/audio-player/audio-player';
import {defaultMediaMetadata} from '../../../layout/audio-player/audio-player-const';
import audioPlayerStyle from '../../../layout/audio-player/audio-player.scss';
import articleStyle from '../article.scss';

export function ArticleAudioList(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, titleImage} = article;
    const trackList: Array<TrackType> = [];

    childList.forEach((articleChild: ArticlePreviewType) => {
        const {title, slug, fileList} = articleChild;

        fileList
            .filter<ArticleFileType>((fileInfo: ArticleFileType): fileInfo is ArticleFileType => {
                return fileInfo.type === ArticleFileTypeEnum.audio;
            })
            .forEach((fileInfo: ArticleFileType, index: number) => {
                const {name, duration} = fileInfo;
                const titleIndex = index > 0 ? ` (${(index + 1).toString(10)})` : '';
                const endTitle = `${title}${titleIndex}`;

                const track: TrackType = {
                    content: (
                        <Link className={audioPlayerStyle.audio_player_list_link} to={getArticleLinkToViewClient(slug)}>
                            {endTitle}
                        </Link>
                    ),
                    duration,
                    mediaMetadata: {...defaultMediaMetadata, title: endTitle},
                    preload: duration ? 'none' : 'metadata',
                    src: getPathToFile(name),
                };

                trackList.push(track);
            });
    });

    return (
        <>
            <Markdown className={articleStyle.article_markdown} mdInput={getFileMarkdownByFullInfo(titleImage)} />
            <AudioPlayerAsync className={articleStyle.article_audio_player} trackList={trackList} />
            <Markdown className={articleStyle.article_markdown} mdInput={content} />;
        </>
    );
}
