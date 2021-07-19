import {DateTimeFormatOptionsType, NumberFormatOptionsType} from '../format';

export type UseFormatHookType = {
    getFormattedDateTime: (date: Date | number, options?: DateTimeFormatOptionsType) => string;
    getFormattedNumber: (value: number, options?: NumberFormatOptionsType) => string;
};
