/* eslint-disable react/no-multi-comp, react/no-danger, id-match */

import * as React from 'react';

import markdownPro from 'markdown-pro';
import markdownProStyle from 'markdown-pro/dist/style.css';
import {
    AudioPlayerControlSprite,
    Audio,
    AudioPlayer,
    TrackType,
    PlayListProvider,
    PlayListPanel,
} from 'react-audio-player-pro';
import reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';

import appStyle from './app.scss';

console.log(reactAudioPlayerProStyle, markdownProStyle, appStyle);

const demoUrl = 'http://webbestmaster.github.io/react-audio-player-pro';

const meydnPureWater = demoUrl + '/audio-file/meydn-pure-water.mp3';
const lesserFaith = demoUrl + '/audio-file/j-syreus-bach-lesser-faith.mp3';
const brothersAllegretto = demoUrl + '/audio-file/dee-yan-key-world-of-brothers-allegretto.mp3';
const atLeastItIs = demoUrl + '/audio-file/mid-air-machine-at-least-it-is.mp3';
const theGhostInYourPiano = demoUrl + '/audio-file/the-ghost-in-your-piano-climb.mp3';

const icon64 = demoUrl + '/image-file/react-icon-64.png';
const icon128 = demoUrl + '/image-file/react-icon-128.png';
const icon256 = demoUrl + '/image-file/react-icon-256.png';
const icon512 = demoUrl + '/image-file/react-icon-512.png';

function CustomContent(): JSX.Element {
    return <div>Custom Content is Here</div>;
}

const singleAudioData = {
    src: meydnPureWater,
    mediaMetadata: {
        title: 'Pure Water',
        artist: 'Meydän',
        album: 'Interplanetary Forest',
        artwork: [
            {src: icon64, sizes: '64x64', type: 'image/png'},
            {src: icon128, sizes: '128x128', type: 'image/png'},
            {src: icon256, sizes: '256x256', type: 'image/png'},
            {src: icon512, sizes: '512x512', type: 'image/png'},
        ],
    },
};

const audioDataList: Array<TrackType> = [
    {
        src: lesserFaith,
        mediaMetadata: {
            title: 'Lesser Faith',
            artist: 'J. Syreus Bach',
            album: 'Ability to Break ~ Energetic Tracks',
            artwork: [
                {src: icon64, sizes: '64x64', type: 'image/png'},
                {src: icon128, sizes: '128x128', type: 'image/png'},
                {src: icon256, sizes: '256x256', type: 'image/png'},
                {src: icon512, sizes: '512x512', type: 'image/png'},
            ],
        },
    },
    {
        src: brothersAllegretto,
        content: <CustomContent/>,
        mediaMetadata: {
            title: 'World of Brothers (Allegretto)',
            artist: 'Dee Yan-Key',
            album: 'Perpetual Peace',
            artwork: [
                {src: icon64, sizes: '64x64', type: 'image/png'},
                {src: icon128, sizes: '128x128', type: 'image/png'},
                {src: icon256, sizes: '256x256', type: 'image/png'},
                {src: icon512, sizes: '512x512', type: 'image/png'},
            ],
        },
    },
    {
        src: atLeastItIs,
        mediaMetadata: {
            title: 'At Least It Is',
            artist: 'Mid-Air Machine',
            album: 'Everywhere Outside ~ World Music',
            artwork: [
                {src: icon64, sizes: '64x64', type: 'image/png'},
                {src: icon128, sizes: '128x128', type: 'image/png'},
                {src: icon256, sizes: '256x256', type: 'image/png'},
                {src: icon512, sizes: '512x512', type: 'image/png'},
            ],
        },
    },
    {
        src: theGhostInYourPiano,
        mediaMetadata: {
            title: 'Climb',
            artist: 'The Ghost in Your Piano',
            album: 'The Ghost in Your Piano',
            artwork: [
                {src: icon64, sizes: '64x64', type: 'image/png'},
                {src: icon128, sizes: '128x128', type: 'image/png'},
                {src: icon256, sizes: '256x256', type: 'image/png'},
                {src: icon512, sizes: '512x512', type: 'image/png'},
            ],
        },
    },
];

export function App(): JSX.Element {
    return (
        <div>
            <PlayListProvider>
                <AudioPlayerControlSprite/>

                <h1 className={appStyle.app_header}>Test TypeScript typing</h1>

                <h2>Test Audio</h2>

                <Audio mediaMetadata={singleAudioData.mediaMetadata} src={singleAudioData.src} useRepeatButton/>

                <h2>Test AudioPlayer</h2>

                <AudioPlayer
                    defaultState={{
                        isMuted: false,
                        activeIndex: 0,
                        isShuffleOn: false,
                        isTrackListOpen: true,
                        repeatingState: 'none',
                    }}
                    trackList={audioDataList}
                />

                <hr/>

                <PlayListPanel/>
            </PlayListProvider>

            <h2>Markdown</h2>

            <div dangerouslySetInnerHTML={{__html: markdownPro('### markdown is here')}}/>

            <div
                dangerouslySetInnerHTML={{
                    __html: markdownPro('### markdown still is here', {
                        parseLink: false,
                        useLineBreak: true,
                    }),
                }}
            />
        </div>
    );
}
