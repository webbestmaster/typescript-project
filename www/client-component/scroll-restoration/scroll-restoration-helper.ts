/* global window */

export function handleScrollToTop() {
    window.document.documentElement.scrollTop = 0;
}

// get scroll top position in percent
export function getRelativeScrollTop(): number {
    return 10;
}

// get scroll top position in pixels
export function getAbsoluteScrollTop(relativeScrollPosition: number): number {
    return relativeScrollPosition;
}
