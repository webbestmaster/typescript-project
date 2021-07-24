/* global window */

import {useCallback, useEffect, useState, useMemo} from 'react';

import {debounce} from '../../util/function';

import {SystemHookType} from './system-hook-type';
import {getIsAndroid, getIsIOS, getScreenSize, getScreenState} from './system-hook-helper';

export function useSystem(): SystemHookType {
    const isAndroid = getIsAndroid();
    const isBrowser = typeof window !== 'undefined';
    const isIOS = getIsIOS();

    const {width: defaultWidth, height: defaultHeight} = getScreenSize();

    const [width, setWidth] = useState<number>(defaultWidth);
    const [height, setHeight] = useState<number>(defaultHeight);

    const handleResize = useCallback(() => {
        const {width: newWidth, height: newHeight} = getScreenSize();

        setWidth(newWidth);
        setHeight(newHeight);
    }, [setWidth, setHeight]);

    useEffect(() => {
        const handleResizeDebounced = debounce<[]>(handleResize, 150);

        window.addEventListener('resize', handleResizeDebounced, {capture: false, passive: true});

        return () => {
            window.removeEventListener('resize', handleResizeDebounced, {capture: false});
        };
    }, [handleResize]);

    return useMemo((): SystemHookType => {
        return {isAndroid, isBrowser, isIOS, screen: getScreenState(width, height)};
    }, [isAndroid, isBrowser, isIOS, width, height]);
}
