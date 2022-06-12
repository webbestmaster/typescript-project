/* eslint-disable react/no-multi-comp, react/jsx-props-no-spreading */
import {lazy, Suspense, ComponentType} from 'react';
import {AudioPropsType, AudioPlayerPropsType, PlayListProviderPropsType} from 'react-audio-player-pro';

import {LazyResultType} from '../util/type';

function Loading(): JSX.Element {
    return <h1>loading</h1>;
}

const AudioPlayerControlSpriteLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {AudioPlayerControlSprite} = await import(
        /* webpackChunkName: 'react-audio-player-pro-audio-player-control-sprite' */
        'react-audio-player-pro'
    );

    return {'default': AudioPlayerControlSprite};
});

export function AudioPlayerControlSpriteAsync() {
    return (
        <Suspense fallback={<Loading />}>
            <AudioPlayerControlSpriteLazy />
        </Suspense>
    );
}

const AudioLazy = lazy<ComponentType<AudioPropsType>>(async (): Promise<LazyResultType<AudioPropsType>> => {
    const {Audio} = await import(
        /* webpackChunkName: 'react-audio-player-pro-audio' */
        'react-audio-player-pro'
    );

    return {'default': Audio};
});

export function AudioAsync(props: AudioPropsType) {
    return (
        <Suspense fallback={<Loading />}>
            <AudioLazy {...props} />
        </Suspense>
    );
}

const AudioPlayerLazy = lazy<ComponentType<AudioPlayerPropsType>>(
    async (): Promise<LazyResultType<AudioPlayerPropsType>> => {
        const {AudioPlayer} = await import(
            /* webpackChunkName: 'react-audio-player-pro-audio-player' */
            'react-audio-player-pro'
        );

        return {'default': AudioPlayer};
    }
);

export function AudioPlayerAsync(props: AudioPlayerPropsType) {
    return (
        <Suspense fallback={<Loading />}>
            <AudioPlayerLazy {...props} />
        </Suspense>
    );
}

const PlayListProviderLazy = lazy<ComponentType<PlayListProviderPropsType>>(
    async (): Promise<LazyResultType<PlayListProviderPropsType>> => {
        const {PlayListProvider} = await import(
            /* webpackChunkName: 'react-audio-player-pro-play-list-provider' */
            'react-audio-player-pro'
        );

        return {'default': PlayListProvider};
    }
);

export function PlayListProviderAsync(props: PlayListProviderPropsType) {
    return (
        <Suspense fallback={<Loading />}>
            <PlayListProviderLazy {...props} />
        </Suspense>
    );
}

const PlayListPanelLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {PlayListPanel} = await import(
        /* webpackChunkName: 'react-audio-player-pro-play-list-panel' */
        'react-audio-player-pro'
    );

    return {'default': PlayListPanel};
});

export function PlayListPanelAsync() {
    return (
        <Suspense fallback={<Loading />}>
            <PlayListPanelLazy />
        </Suspense>
    );
}
