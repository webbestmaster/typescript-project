import {createContext, useMemo, useState, ReactNode, useCallback, useEffect} from 'react';

import {ThemeContextType, ThemeNameEnum} from './theme-context-type';
import {defaultThemeContext} from './theme-context-const';
import themeContextStyle from './theme-context.scss';
import {maxFontSize, minFontSize, saveFontSize} from './font-size-helper';

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const {Provider: ThemeContextProvider} = ThemeContext;

type ThemeContextPropsType = {
    readonly children: ReactNode;
    readonly defaultThemeName: ThemeNameEnum | null;
};

export function ThemeProvider(props: ThemeContextPropsType): JSX.Element {
    const {children, defaultThemeName} = props;

    const [themeName, setThemeName] = useState<ThemeNameEnum>(defaultThemeName || defaultThemeContext.themeName);
    const [mdFontSize, setMdFontSize] = useState<number>(defaultThemeContext.mdFontSize);

    const setMdFontSizeMemoized = useCallback((newFontSize: number) => {
        if (newFontSize > maxFontSize || newFontSize < minFontSize) {
            return;
        }
        setMdFontSize(newFontSize);
    }, []);

    useEffect(() => {
        saveFontSize(mdFontSize);
    }, [mdFontSize]);

    const providedData: ThemeContextType = useMemo<ThemeContextType>(() => {
        return {mdFontSize, setMdFontSize: setMdFontSizeMemoized, setThemeName, themeName};
    }, [themeName, setMdFontSizeMemoized, mdFontSize]);

    return (
        <ThemeContextProvider value={providedData}>
            <div className={themeContextStyle.theme_context} data-theme-name={themeName}>
                {children}
            </div>
        </ThemeContextProvider>
    );
}
