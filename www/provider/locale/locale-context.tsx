import {Context, createContext, useCallback, useMemo, useState} from 'react';

import {LocaleContextType, LocaleContextValueMapType, LocaleNameEnum} from './locale-context-type';
import {
    getDefaultLocaleContextData,
    getLocalizedString as getLocalizedStringHelper,
    getShortLocaleName,
    saveLocaleName,
} from './locale-context-helper';
import {LangKeyType} from './translation/type';

const defaultLocaleContextData = getDefaultLocaleContextData();

export const LocaleContext: Context<LocaleContextType> = createContext<LocaleContextType>(defaultLocaleContextData);

type PropsType = {
    children: JSX.Element;
};

export function LocaleProvider(props: PropsType): JSX.Element {
    const {children} = props;
    const [localeName, setLocaleName] = useState<LocaleNameEnum>(defaultLocaleContextData.localeName);

    const memoizedSetLocaleName = useCallback(function setLocaleNameInner(newLocaleName: LocaleNameEnum) {
        saveLocaleName(newLocaleName);
        setLocaleName(newLocaleName);
    }, []);

    const getLocalizedString = useCallback(
        function getLocalizedStringInner(stringKey: LangKeyType, valueMap?: LocaleContextValueMapType): string {
            return getLocalizedStringHelper(stringKey, localeName, valueMap);
        },
        [localeName]
    );

    const providedData: LocaleContextType = useMemo((): LocaleContextType => {
        return {
            getLocalizedString,
            localeName,
            setLocaleName: memoizedSetLocaleName,
            shortLocaleName: getShortLocaleName(localeName),
        };
    }, [localeName, memoizedSetLocaleName, getLocalizedString]);

    return <LocaleContext.Provider value={providedData}>{children}</LocaleContext.Provider>;
}
