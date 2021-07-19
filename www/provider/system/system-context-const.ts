import {ScreenWidthNameEnum} from './system-context-type';

export const screenMinWidth: {[key in ScreenWidthNameEnum]: number} = {
    [ScreenWidthNameEnum.desktop]: 980,
    [ScreenWidthNameEnum.mobile]: 320,
    [ScreenWidthNameEnum.tablet]: 768,
};
