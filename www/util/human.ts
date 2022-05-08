export function humanNormalizeString(text: string): string {
    return text.trim().replace(/\s+/gi, ' ');
}

export function stringToArrayByComma(texts: Array<string> | string): Array<string> {
    if (Array.isArray(texts)) {
        return texts;
    }

    return texts.split(',').map(humanNormalizeString).filter(Boolean);
}

export function arrayToStringByComma(texts: Array<string> | string): string {
    if (Array.isArray(texts)) {
        return texts.map(humanNormalizeString).filter(Boolean).join(', ');
    }

    return texts;
}
