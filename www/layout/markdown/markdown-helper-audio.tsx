import {Fragment} from 'react';
import {Audio} from 'react-audio-player-pro';

// eslint-disable-next-line complexity
function getAudioFromHtml(audioHtmlCode: string): JSX.Element {
    // className?: string;
    // downloadFileName?: string;
    // mediaMetadata?: MediaMetadataInit;
    // onDidMount?: (audioNode: HTMLAudioElement | null) => void;
    // src: string;
    // useRepeatButton?: boolean;

    const [ignoredFullSrcString, srcAsString = ''] = audioHtmlCode.match(/src="(\S+)"/) || ['', ''];
    const [ignoredFullDurationString, durationAsString = ''] = audioHtmlCode.match(/data-duration="(\S+)"/) || ['', ''];
    const [ignoredFullDownloadString, downloadAsString = ''] = audioHtmlCode.match(/data-download="(\S+)"/) || ['', ''];
    const durationAsNumber = Number.parseFloat(durationAsString) || 0;
    const downloadFileName = downloadAsString.trim();

    if (durationAsNumber) {
        return (
            <Audio
                downloadFileName={downloadFileName}
                duration={durationAsNumber}
                preload="none"
                src={srcAsString}
                useRepeatButton
            />
        );
    }

    return <Audio downloadFileName={downloadFileName} preload="metadata" src={srcAsString} useRepeatButton />;
}

export function markdownAudio(htmlCode: string): Array<JSX.Element> {
    const audioRegExp = /<audio[\S\s]+?<\/audio>/gi;

    const splitTextList: Array<string> = htmlCode.split(audioRegExp);
    const audioList: Array<string> = htmlCode.match(audioRegExp) || [];

    return splitTextList.map((htmlChunk: string, index: number): JSX.Element => {
        const key = index.toString(16);
        const audioPart = audioList[index];

        return (
            <Fragment key={key}>
                <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{__html: htmlChunk}}
                />
                {audioPart ? getAudioFromHtml(audioPart) : null}
            </Fragment>
        );
    });
}
