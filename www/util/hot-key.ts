/* global document, KeyboardEvent */
import {useEffect} from 'react';

export const enum HotKeyModifierEnum {
    alt = 'alt',
    ctrl = 'ctrl',
    shift = 'shift',
}

export function useHotKey(modifierList: Array<HotKeyModifierEnum>, char: string, handleHotKey: () => unknown) {
    const hasAlt = modifierList.includes(HotKeyModifierEnum.alt);
    const hasCtrl = modifierList.includes(HotKeyModifierEnum.ctrl);
    const hasShift = modifierList.includes(HotKeyModifierEnum.shift);

    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            const isNeededKeysMatched = evt.altKey === hasAlt && evt.ctrlKey === hasCtrl && evt.shiftKey === hasShift;

            if (isNeededKeysMatched && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                evt.preventDefault();
                handleHotKey();
            }
        }

        document.body.addEventListener('keydown', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keydown', handleBodyOnKeyPress, false);
        };
    }, [hasAlt, hasCtrl, hasShift, char, handleHotKey]);
}
/*

export function useCtrlShiftKey(char: string, handleHotKey: () => unknown) {
    useEffect(() => {
        function handleBodyOnKeyPress(evt: KeyboardEvent) {
            // console.log('---> useCtrlShiftKey', evt);

            if (evt.ctrlKey && evt.shiftKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                evt.preventDefault();
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
            // console.log('---> useCtrlAltKey', evt);

            if (evt.ctrlKey && evt.altKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                evt.preventDefault();
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
            // console.log('---> useShiftAltKey', evt);

            if (evt.shiftKey && evt.altKey && evt.code.toLowerCase() === `key${char}`.toLowerCase()) {
                evt.preventDefault();
                handleHotKey();
            }
        }

        document.body.addEventListener('keydown', handleBodyOnKeyPress, false);

        return () => {
            document.body.removeEventListener('keydown', handleBodyOnKeyPress, false);
        };
    }, [char, handleHotKey]);
}
*/
