export type ScreenWidthNameType = 'desktop' | 'mobile' | 'tablet';

export type SystemContextScreenType = {
    devicePixelRatio: number;
    height: number;
    isDesktop: boolean;
    isLandscape: boolean;
    isMobile: boolean;
    isPortrait: boolean;
    isTablet: boolean;
    littleThenList: Array<ScreenWidthNameType>;
    name: ScreenWidthNameType;
    width: number;
};

export type SystemContextType = {
    isAndroid: boolean;
    isIOS: boolean;
    isScriptLoaded: boolean;
    isWindowLoaded: boolean;
    screen: SystemContextScreenType;
};
