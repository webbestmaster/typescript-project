import {useCallback, useContext} from 'react';

import {LocaleContextType} from '../../provider/locale/locale-context-type';
import {LocaleContext} from '../../provider/locale/locale-context';
import {
    DateTimeFormatOptionsType,
    getFormattedDateTime,
    getFormattedNumber,
    NumberFormatOptionsType,
} from '../../util/format';

import {UseFormatHookType} from './format-hook-type';

export function useFormat(): UseFormatHookType {
    const localeContext = useContext<LocaleContextType>(LocaleContext);
    const {localeName} = localeContext;

    const getFormattedNumberWrapper = useCallback(
        (value: number, options?: NumberFormatOptionsType): string => {
            return getFormattedNumber(localeName, value, options);
        },
        [localeName]
    );

    const getFormattedDateTimeWrapper = useCallback(
        (date: Date | number, options?: DateTimeFormatOptionsType): string => {
            return getFormattedDateTime(localeName, date, options);
        },
        [localeName]
    );

    return {
        getFormattedDateTime: getFormattedDateTimeWrapper,
        getFormattedNumber: getFormattedNumberWrapper,
    };
}
