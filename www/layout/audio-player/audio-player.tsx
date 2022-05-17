/*
import {lazy, Suspense, ComponentType} from 'react';

import {AudioPlayerPropsType} from 'react-audio-player-pro';
*/

/*
export {
    AudioPlayerControlSprite,
    Audio,
    AudioPlayer,
    PlayListContext,
    PlayListPanel,
    PlayListProvider,
} from 'react-audio-player-pro';
*/

type LazyResultType<ItemType> = {default: ItemType};

/*
function Loading(): JSX.Element {
    return <h1>loading</h1>;
}

const AudioPlayerControlSpriteLazy = lazy<ComponentType<unknown>>(
    async (): Promise<LazyResultType<ComponentType<unknown>>> => {
        const {AudioPlayerControlSprite} = await import(
            /!* webpackChunkName: 'page-cms-article-create' *!/
            'react-audio-player-pro'
        );

        return {'default': AudioPlayerControlSprite};
    }
);

export function AudioPlayerControlSpriteAsync() {
    return (
        <Suspense fallback={<Loading />}>
            <AudioPlayerControlSpriteLazy />
        </Suspense>
    );
}

const AudioPlayerLazy = lazy<ComponentType<AudioPlayerPropsType>>(
    async (): Promise<LazyResultType<ComponentType<AudioPlayerPropsType>>> => {
        const {AudioPlayer} = await import(
            /!* webpackChunkName: 'page-cms-article-create' *!/
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
*/
