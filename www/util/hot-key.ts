/* global document, KeyboardEvent */
import {useEffect} from 'react';

export function useCtrlShiftKey(char: string, handleHotKey: () => unknown) {
    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            console.log('---> useCtrlShiftKey', evt);

            evt.preventDefault();

            if (evt.ctrlKey && evt.shiftKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                handleHotKey();
            }
        }

        document.body.addEventListener('keydown', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keydown', handleBodyOnKeyPress, false);
        };
    }, [char, handleHotKey]);
}

export function useCtrlAltKey(char: string, handleHotKey: () => unknown) {
    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            console.log('---> useCtrlAltKey', evt);

            evt.preventDefault();

            if (evt.ctrlKey && evt.altKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                handleHotKey();
            }
        }

        document.body.addEventListener('keydown', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keydown', handleBodyOnKeyPress, false);
        };
    }, [char, handleHotKey]);
}

export function useShiftAltKey(char: string, handleHotKey: () => unknown) {
    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            console.log('---> useShiftAltKey', evt);

            evt.preventDefault();

            if (evt.shiftKey && evt.altKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                handleHotKey();
            }
        }

        document.body.addEventListener('keydown', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keydown', handleBodyOnKeyPress, false);
        };
    }, [char, handleHotKey]);
}
