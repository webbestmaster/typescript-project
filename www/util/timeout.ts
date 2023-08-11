/* global requestIdleCallback, setTimeout */

export function waitForTime(timeInMs: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(() => {
            resolve();
        }, timeInMs);
    });
}

export function requestIdleCallbackPolyfill(...args: Parameters<typeof requestIdleCallback>): void {
    const [callback, option = {}] = args;
    const defaultTimeout = 0;
    const {timeout = defaultTimeout} = option;

    if (typeof requestIdleCallback !== 'function') {
        setTimeout(callback, timeout);
        return;
    }

    requestIdleCallback(callback, option);
}
