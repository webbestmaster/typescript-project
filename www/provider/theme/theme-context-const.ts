import {noop} from '../../util/function';

import {ThemeContextType, ThemeNameEnum} from './theme-context-type';

export const defaultThemeContext: ThemeContextType = {
    setThemeName: noop,
    themeName: ThemeNameEnum.light,
};
