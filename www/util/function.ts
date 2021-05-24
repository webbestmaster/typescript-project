/* global NodeJS, setTimeout, clearTimeout */

import {useCallback} from 'react';

export function noop(): unknown {
    return;
}

export function debounce(wrappedFunction: () => unknown, waitInMs: number): () => unknown {
    let timeout: NodeJS.Timeout | null = null;

    return function debouncedFunction() {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(wrappedFunction, waitInMs);
    };
}

export function debounceArgs(
    wrappedFunction: (...args: Array<unknown>) => unknown,
    waitInMs: number
): (...args: Array<unknown>) => unknown {
    let timeout: NodeJS.Timeout | null = null;

    return function debouncedFunction(...args: Array<unknown>) {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            wrappedFunction(...args);
        }, waitInMs);
    };
}

export function useToggle(callback: (isNewActive: boolean) => void, isActive: boolean): () => void {
    return useCallback<() => void>(
        function toggleInner(): void {
            callback(!isActive);
        },
    [callback, isActive]
    );
}
