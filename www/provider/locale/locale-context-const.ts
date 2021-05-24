import {enUs} from './translation/en-us/data';
import {ruRu} from './translation/ru-ru/data';
import {zhCn} from './translation/zh-cn/data';
import {zhTw} from './translation/zh-tw/data';
import {LocaleConstType, LocaleNameEnum, ShortLocaleNameEnum} from './locale-context-type';
import {LangDataType, LangKeyType} from './translation/type';

export const allLocalesData: Record<LocaleNameEnum, LangDataType> = {
    [LocaleNameEnum.enUs]: enUs,
    [LocaleNameEnum.ruRu]: ruRu,
    [LocaleNameEnum.zhCn]: zhCn,
    [LocaleNameEnum.zhTw]: zhTw,
};

export const localeNameList: Array<LocaleNameEnum> = [
    LocaleNameEnum.enUs,
    LocaleNameEnum.ruRu,
    LocaleNameEnum.zhCn,
    LocaleNameEnum.zhTw,
];

export const splitValueStringRegExp = /(?={\w+?})/g;

export const weekDayList: Array<LangKeyType> = [
    'WEEK_DAY__MONDAY',
    'WEEK_DAY__TUESDAY',
    'WEEK_DAY__WEDNESDAY',
    'WEEK_DAY__THURSDAY',
    'WEEK_DAY__FRIDAY',
    'WEEK_DAY__SATURDAY',
    'WEEK_DAY__SUNDAY',
];

export const localeConst: LocaleConstType = {
    defaults: {
        localeName: LocaleNameEnum.enUs,
        shortLocaleName: ShortLocaleNameEnum.en,
    },
    key: {
        localStorage: {
            localeName: 'my-locale-name-v.1.0', // PROJECT_ID + 'my-locale-name-v.1.0'
        },
    },
};
