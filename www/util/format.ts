/* global Intl */

import {LocaleNameEnum} from '../provider/locale/locale-context-type';

export enum TimeSizeEnum {
    year = 'year',
    month = 'month',
    day = 'day',
    hour = 'hour',
    minute = 'minute',
    second = 'second',
}

export type NumberFormatOptionsType = Intl.NumberFormatOptions & {
    style?: 'decimal' | 'currency' | 'percent' | 'unit';
    unit?: TimeSizeEnum | 'liter';
    unitDisplay?: 'long' | 'short' | 'narrow';
    signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
};

export function getFormattedNumber(
    localeName: LocaleNameEnum,
    value: number,
    options?: NumberFormatOptionsType
): string {
    const formatter = new Intl.NumberFormat(localeName, options);

    return formatter.format(value);
}

type FormatMainType = 'numeric' | '2-digit';

export type DateTimeFormatOptionsType = {
    [TimeSizeEnum.year]?: FormatMainType;
    [TimeSizeEnum.month]?: FormatMainType | 'narrow' | 'short' | 'long';
    [TimeSizeEnum.day]?: FormatMainType;
    [TimeSizeEnum.hour]?: FormatMainType;
    [TimeSizeEnum.minute]?: FormatMainType;
    [TimeSizeEnum.second]?: FormatMainType;
    timeZone?: string;
};

export function getFormattedDateTime(
    localeName: LocaleNameEnum,
    date: Date | number,
    options?: DateTimeFormatOptionsType
): string {
    const formatter = new Intl.DateTimeFormat(localeName, options);

    return formatter.format(date);
}
