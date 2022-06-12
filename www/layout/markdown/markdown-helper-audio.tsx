import {Fragment} from 'react';

import {AudioAsync} from '../audio-player';

function getAudioFromHtml(audioHtmlCode: string): JSX.Element {
    // className?: string;
    // downloadFileName?: string;
    // mediaMetadata?: MediaMetadataInit;
    // onDidMount?: (audioNode: HTMLAudioElement | null) => void;
    // src: string;
    // useRepeatButton?: boolean;

    const [ignoredFullSrcString, srcAsString = ''] = audioHtmlCode.match(/src="(\S+)"/) || ['', ''];

    return <AudioAsync src={srcAsString} />;
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
