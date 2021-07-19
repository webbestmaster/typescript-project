import {LangKeyType} from './translation/type';

export type LocaleContextValueMapType = Record<string, JSX.Element | number | string>;

export enum LocaleNameEnum {
    enUs = 'en-US',
    ruRu = 'ru-RU',
    zhCn = 'zh-CN',
    zhTw = 'zh-TW',
}

export enum ShortLocaleNameEnum {
    en = 'en',
    ru = 'ru',
    zh = 'zh',
}

export type LocaleContextType = {
    getLocalizedString: (stringKey: LangKeyType, valueMap?: LocaleContextValueMapType) => string;
    localeName: LocaleNameEnum;
    setLocaleName: (localeName: LocaleNameEnum) => void;
    shortLocaleName: ShortLocaleNameEnum;
};

export type LocaleConstType = {
    defaults: {
        localeName: LocaleNameEnum;
        shortLocaleName: ShortLocaleNameEnum;
    };
    key: {
        localStorage: {
            localeName: string;
        };
    };
};
