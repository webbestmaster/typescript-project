import {ScreenWidthNameType} from './system-context-type';

export const screenMinWidth: {[key in ScreenWidthNameType]: number} = {
    desktop: 980,
    mobile: 320,
    tablet: 768,
};

export const screenNameReference: {[key in ScreenWidthNameType]: ScreenWidthNameType} = {
    desktop: 'desktop',
    mobile: 'mobile',
    tablet: 'tablet',
};
