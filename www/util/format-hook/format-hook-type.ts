import {DateTimeFormatOptionsType, NumberFormatOptionsType} from '../format';

export type UseFormatHookType = {
    getFormattedNumber: (value: number, options?: NumberFormatOptionsType) => string;
    getFormattedDateTime: (date: Date | number, options?: DateTimeFormatOptionsType) => string;
};
