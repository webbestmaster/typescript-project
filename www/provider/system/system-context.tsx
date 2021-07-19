/* global window */

import {Context, createContext, useCallback, useEffect, useState} from 'react';

import {debounce} from '../../util/function';

import {getSystemState} from './system-context-helper';
import {SystemContextType} from './system-context-type';

const defaultSystemContextData = getSystemState();

export const SystemContext: Context<SystemContextType> = createContext<SystemContextType>(defaultSystemContextData);

type PropsType = {
    children: JSX.Element | Array<JSX.Element> | string;
};

export function SystemProvider(props: PropsType): JSX.Element {
    const {children} = props;

    const [providedData, setProvidedData] = useState<SystemContextType>(defaultSystemContextData);

    /*
    useEffect(() => {
        console.log('---- system data ----');
        console.log(JSON.stringify(providedData, null, 4));
    }, [providedData]);
*/

    const handleResize = useCallback(
        function handleResizeInner(): void {
            const {isWindowLoaded, screen} = providedData;
            const {width, height} = screen;
            const systemState = getSystemState();

            if (systemState.screen.width !== width || systemState.screen.height !== height) {
                setProvidedData({...systemState, isWindowLoaded});
            }
        },
        [providedData, setProvidedData]
    );

    const handleWindowLoad = useCallback(
        function handleWindowLoadInner(): void {
            const systemState = getSystemState();

            setProvidedData({...systemState, isWindowLoaded: true});

            window.removeEventListener('load', handleWindowLoad, false);
        },
        [setProvidedData]
    );

    useEffect(() => {
        const handleResizeDebounced = debounce<[]>(handleResize, 150);

        window.addEventListener('resize', handleResizeDebounced, {capture: false, passive: true});
        window.addEventListener('load', handleWindowLoad, false);

        return () => {
            window.removeEventListener('resize', handleResizeDebounced, {capture: false});
            window.removeEventListener('load', handleWindowLoad, false);
        };
    }, [setProvidedData, handleResize, handleWindowLoad]);

    return <SystemContext.Provider value={providedData}>{children}</SystemContext.Provider>;
}
