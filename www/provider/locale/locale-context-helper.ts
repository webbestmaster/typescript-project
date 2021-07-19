/* global localStorage, navigator */

import {noop} from '../../util/function';
import {getEnumValueEnsure} from '../../util/enum';

import {allLocalesData, localeConst, localeNameList} from './locale-context-const';
import {LangKeyType} from './translation/type';
import {LocaleContextType, LocaleContextValueMapType, LocaleNameEnum, ShortLocaleNameEnum} from './locale-context-type';

// eslint-disable-next-line complexity
export function getSavedLocaleName(): LocaleNameEnum {
    const defaultLocaleName = localeConst.defaults.localeName;

    if (typeof localStorage === 'undefined' || typeof navigator === 'undefined') {
        return defaultLocaleName;
    }

    const savedLocaleName = localStorage.getItem(localeConst.key.localStorage.localeName);

    // eslint-disable-next-line no-loops/no-loops
    for (const localeNameInList of localeNameList) {
        if (localeNameInList === savedLocaleName) {
            return localeNameInList;
        }
    }

    const navigatorLanguages = navigator.languages;

    // eslint-disable-next-line no-loops/no-loops
    for (const deviceLocaleName of navigatorLanguages) {
        // eslint-disable-next-line no-loops/no-loops
        for (const localeNameInList of localeNameList) {
            if (deviceLocaleName === localeNameInList) {
                return localeNameInList;
            }
        }
    }

    return defaultLocaleName;
}

export function saveLocaleName(localeName: LocaleNameEnum): LocaleNameEnum {
    console.log('---> save localeName localStorage:', localeConst.key.localStorage.localeName, localeName);
    localStorage.setItem(localeConst.key.localStorage.localeName, localeName);

    return localeName;
}

function replacePlaceholderMap(rawString: string, valueMap: LocaleContextValueMapType): string {
    let resultString = rawString;

    const keyList = Object.keys(valueMap);

    // eslint-disable-next-line no-loops/no-loops
    for (const objectKey of keyList) {
        resultString = resultString.replace(new RegExp('{' + objectKey + '}', 'g'), String(valueMap[objectKey]));
    }

    return resultString;
}

export function getLocalizedString(
    stringKey: LangKeyType,
    localeName: LocaleNameEnum,
    valueMap?: LocaleContextValueMapType
): string {
    const resultString = allLocalesData[localeName][stringKey];

    return valueMap ? replacePlaceholderMap(resultString, valueMap) : resultString;
}

export function getShortLocaleName(localeName: LocaleNameEnum): ShortLocaleNameEnum {
    const [mayBeShortLocaleName] = localeName.split('-');

    return getEnumValueEnsure<ShortLocaleNameEnum>(
        ShortLocaleNameEnum,
        mayBeShortLocaleName,
        localeConst.defaults.shortLocaleName
    );
}

export function getDefaultLocaleContextData(): LocaleContextType {
    const savedLocaleName = getSavedLocaleName();

    return {
        getLocalizedString: (stringKey: LangKeyType, valueMap?: LocaleContextValueMapType): string =>
            getLocalizedString(stringKey, localeConst.defaults.localeName, valueMap),
        localeName: savedLocaleName,
        setLocaleName: noop,
        shortLocaleName: getShortLocaleName(savedLocaleName),
    };
}
