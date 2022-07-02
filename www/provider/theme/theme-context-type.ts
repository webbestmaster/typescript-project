export enum ThemeNameEnum {
    dark = 'dark',
    light = 'light',
    neon = 'neon',
    twilight = 'twilight',
}

export type ThemeContextType = {
    setThemeName: (themeName: ThemeNameEnum) => void;
    themeName: ThemeNameEnum;
};
