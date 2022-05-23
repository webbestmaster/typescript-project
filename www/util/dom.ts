/* global document */

export function removeBySelector(selector: string) {
    if (typeof document === 'undefined') {
        return;
    }

    const htmlNode = document.querySelector(selector);

    if (!htmlNode) {
        return;
    }

    htmlNode.remove();
}
