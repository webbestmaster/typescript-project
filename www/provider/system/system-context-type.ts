export enum ScreenWidthNameEnum {
    'desktop' = 'desktop',
    'mobile' = 'mobile',
    'tablet' = 'tablet',
}

export type SystemContextScreenType = {
    devicePixelRatio: number;
    height: number;
    isDesktop: boolean;
    isLandscape: boolean;
    isMobile: boolean;
    isPortrait: boolean;
    isTablet: boolean;
    littleThenList: Array<ScreenWidthNameEnum>;
    name: ScreenWidthNameEnum;
    width: number;
};

export type SystemContextType = {
    isAndroid: boolean;
    isIOS: boolean;
    isScriptLoaded: boolean;
    isWindowLoaded: boolean;
    screen: SystemContextScreenType;
};
