/* global document, KeyboardEvent */
import {useEffect} from 'react';

export function useCtrlShiftKey(char: string, handleHotKey: () => unknown) {
    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            console.log('---> handleBodyOnKeyPress', evt);

            if (evt.shiftKey && evt.ctrlKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                handleHotKey();
            }
        }

        document.body.addEventListener('keypress', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keypress', handleBodyOnKeyPress, false);
        };
    }, [char, handleHotKey]);
}
