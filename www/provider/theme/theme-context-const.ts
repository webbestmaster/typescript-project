import {noop} from '../../util/function';

import {ThemeContextType, ThemeNameEnum} from './theme-context-type';
import {getSavedFontSize} from './font-size-helper';

export const defaultThemeContext: ThemeContextType = {
    mdFontSize: getSavedFontSize(),
    setMdFontSize: noop,
    setThemeName: noop,
    themeName: ThemeNameEnum.light,
};
