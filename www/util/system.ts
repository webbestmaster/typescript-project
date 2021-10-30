function getIsBrowser(): boolean {
    return typeof window !== 'undefined';
}

export const isBrowser = getIsBrowser();
