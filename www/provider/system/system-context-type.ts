export type ScreenWidthNameType = 'desktop' | 'mobile' | 'tablet';

export type SystemContextScreenType = {
    width: number;
    height: number;
    name: ScreenWidthNameType;
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
    littleThenList: Array<ScreenWidthNameType>;
    isLandscape: boolean;
    isPortrait: boolean;
    devicePixelRatio: number;
};

export type SystemContextType = {
    screen: SystemContextScreenType;
    isIOS: boolean;
    isAndroid: boolean;
    isScriptLoaded: boolean;
    isWindowLoaded: boolean;
};
