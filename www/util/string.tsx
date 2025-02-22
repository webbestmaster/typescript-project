import type {LocaleNameEnum} from "../provider/locale/locale-context-type";
import {makeSafeRegExpPatter} from "./regexp";

export function getHash(data: Array<unknown> | Record<string, unknown> | string): string {
    let result = 0;
    const fullString: string = typeof data === "string" ? data : JSON.stringify(data, null, 0);
    const stringLength = fullString.length;

    for (let index = 0; index < stringLength; index += 1) {
        result = Math.trunc(Math.imul(31, result) + (fullString.codePointAt(index) ?? 0));
    }

    return result.toString(32);
}

export function getRandomString(): string {
    // eslint-disable-next-line sonarjs/pseudo-random
    const fromRandom = Math.random().toString(32).replace("0.", "");
    const fromTime = Date.now().toString(32);

    return `${fromRandom}${fromTime}`.toLowerCase();
}

export function findString(input: string, searchQuery: string, flags: "" | "g" | "gi" = "gi"): Array<string> {
    const result: Array<string> = [];
    const searchQueryLength = searchQuery.length;

    const splitRegExp = new RegExp(`(?=${makeSafeRegExpPatter(searchQuery)})`, flags);
    const equalRegExp = new RegExp(`^${makeSafeRegExpPatter(searchQuery)}`, flags);

    const splitLeftList: Array<string> = input.split(splitRegExp);

    for (const leftSplitPart of splitLeftList) {
        if (equalRegExp.test(leftSplitPart)) {
            result.push(leftSplitPart.slice(0, searchQueryLength), leftSplitPart.slice(searchQueryLength));
        } else {
            result.push(leftSplitPart);
        }
    }

    return result;
}

export function sortCompare(shortLocaleName: LocaleNameEnum, stringA: string, stringB: string): number {
    return new Intl.Collator(shortLocaleName).compare(stringA, stringB);
}

export function toTrimmedString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

export function sortStringCallback(stringA: string, stringB: string): number {
    return stringA.localeCompare(stringB);
}

export function sortStringCallbackReverse(stringA: string, stringB: string): number {
    // eslint-disable-next-line sonarjs/arguments-order
    return sortStringCallback(stringB, stringA);
}

export function getTickCross(isEnable: boolean): string {
    // eslint-disable-next-line sonarjs/no-selector-parameter
    return isEnable ? "✔" : "❌";
}

export function formatProgress(current: number, max: number): string {
    const partCount = 20;
    const currentPart = Math.floor((current / max) * partCount);
    const progressString = "".padEnd(currentPart, "/").padEnd(partCount, ".");
    const currentString = current.toString(10).padStart(max.toString(10).length, " ");

    return `[${progressString}] ${currentString} / ${max}`;
}

export function convertStringForHtml(value: string): string {
    return value
        .replace(/&/gu, "&amp;")
        .replace(/>/gu, "&gt;")
        .replace(/</gu, "&lt;")
        .replace(/"/gu, "&quot;")
        .replace(/'/gu, "&#039;")
        .replace(/\//gu, "&#47;")
        .replace(/\\/gu, "&#92;");
}
