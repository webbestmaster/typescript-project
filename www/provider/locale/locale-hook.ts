import {useContext} from 'react';

import {LocaleContextType} from './locale-context-type';
import {LocaleContext} from './c-locale-context';

export function useLocale(): LocaleContextType {
    return useContext<LocaleContextType>(LocaleContext);
}
