import {ScreenWidthNameType} from './system-context-type';

export const screenMinWidth: {[key in ScreenWidthNameType]: number} = {
    desktop: 980,
    tablet: 768,
    mobile: 320,
};

export const screenNameReference: {[key in ScreenWidthNameType]: ScreenWidthNameType} = {
    desktop: 'desktop',
    tablet: 'tablet',
    mobile: 'mobile',
};
