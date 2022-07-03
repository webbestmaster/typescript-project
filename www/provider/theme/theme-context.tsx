import {createContext, useMemo, useState, ReactNode} from 'react';

import {ThemeContextType, ThemeNameEnum} from './theme-context-type';
import {defaultThemeContext} from './theme-context-const';
import themeContextStyle from './theme-context.scss';

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const {Provider: ThemeContextProvider} = ThemeContext;

type ThemeContextPropsType = {
    children: ReactNode;
    defaultThemeName: ThemeNameEnum | null;
};

export function ThemeProvider(props: ThemeContextPropsType): JSX.Element {
    const {children, defaultThemeName} = props;

    const [themeName, setThemeName] = useState<ThemeNameEnum>(defaultThemeName || defaultThemeContext.themeName);

    const providedData: ThemeContextType = useMemo<ThemeContextType>(() => {
        return {setThemeName, themeName};
    }, [themeName]);

    return (
        <ThemeContextProvider value={providedData}>
            <div className={themeContextStyle.theme_context} data-theme-name={themeName}>
                {children}
            </div>
        </ThemeContextProvider>
    );
}
