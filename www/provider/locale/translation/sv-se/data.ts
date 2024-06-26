import {enUs} from "../en-us/data";
import type {LocaleDictionaryType} from "../type";

export const svSe: LocaleDictionaryType = {
    ...enUs,

    /* eslint-disable id-length, sort-keys */
    META__LANGUAGE_NAME: "Svanska",

    NAVIGATION__HOME: "Hem",

    GDPR__WE_USE_COOKIES: "Genom att använda denna webbplats samtycker du till användningen av cookies.",
    GDPR__WHAT_ARE_COOKIES: "Vad är cookies?",

    SHARE__RECOMMEND_TO_FRIENDS__HEADER: "Rekommendera till vänner:",
    SHARE__HEADER: "Dela med sig:",
    SEE_ALSO__HEADER: "Se även:",

    /* eslint-enable id-length, sort-keys */
};

/**
 * Const keyList: Array<string> = [];
 * const valueList: Array<string> = [];
 * Object.entries(enUs).forEach((data: [string, string]) => {
 *     const [key, value] = data;
 *
 *     keyList.push(key);
 *     valueList.push(value);
 * });
 * console.log('---- i18n keys ----');
 * console.log(keyList.join('\n'));
 * console.log('---- i18n values ----');
 * console.log(valueList.join('\n'));
 */
