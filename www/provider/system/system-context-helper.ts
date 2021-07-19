/* global window, document, navigator */

import {ScreenWidthNameEnum, SystemContextScreenType, SystemContextType} from './system-context-type';
import {screenMinWidth} from './system-context-const';

function getScreenName(screenWidth: number): ScreenWidthNameEnum {
    if (screenWidth >= screenMinWidth[ScreenWidthNameEnum.desktop]) {
        return ScreenWidthNameEnum.desktop;
    }

    if (screenWidth >= screenMinWidth[ScreenWidthNameEnum.tablet]) {
        return ScreenWidthNameEnum.tablet;
    }

    return ScreenWidthNameEnum.mobile;
}

function getLittleThenList(screenWidth: number): Array<ScreenWidthNameEnum> {
    const littleThenList: Array<ScreenWidthNameEnum> = [];

    if (screenWidth < screenMinWidth.desktop) {
        littleThenList.push(ScreenWidthNameEnum.desktop);
    }

    if (screenWidth < screenMinWidth.tablet) {
        littleThenList.push(ScreenWidthNameEnum.tablet);
    }

    if (screenWidth < screenMinWidth.mobile) {
        littleThenList.push(ScreenWidthNameEnum.mobile);
    }

    return littleThenList;
}

function getScreenSize(): {height: number; width: number} {
    const defaultSize = {
        height: screenMinWidth.desktop,
        width: screenMinWidth.desktop,
    };

    if (typeof document === 'undefined') {
        return defaultSize;
    }

    const {documentElement} = document;

    if (!documentElement) {
        return defaultSize;
    }

    const {clientWidth: width, clientHeight: height} = documentElement;

    return {height, width};
}

export function getDevicePixelRatio(): number {
    const defaultDevicePixelRatio = 2;

    if (typeof window === 'undefined') {
        return defaultDevicePixelRatio;
    }

    const {devicePixelRatio} = window;

    if (typeof devicePixelRatio !== 'number' || Number.isNaN(devicePixelRatio)) {
        return defaultDevicePixelRatio;
    }

    if (devicePixelRatio <= defaultDevicePixelRatio) {
        return defaultDevicePixelRatio;
    }

    return devicePixelRatio;
}

function getScreenState(): SystemContextScreenType {
    const {width, height} = getScreenSize();

    const isLandscape = width > height; // use >, do not use >=, if width === height it is portrait
    const screenName = getScreenName(width);

    return {
        devicePixelRatio: getDevicePixelRatio(),
        height,
        isDesktop: screenName === ScreenWidthNameEnum.desktop,
        isLandscape,
        isMobile: screenName === ScreenWidthNameEnum.mobile,
        isPortrait: !isLandscape,
        isTablet: screenName === ScreenWidthNameEnum.tablet,
        littleThenList: getLittleThenList(width),
        name: screenName,
        width,
    };
}

function getIsIOS(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function getIsAndroid(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return /(android)/i.test(navigator.userAgent);
}

export function getSystemState(): SystemContextType {
    return {
        isAndroid: getIsAndroid(),
        isIOS: getIsIOS(),
        isScriptLoaded: typeof window !== 'undefined',
        isWindowLoaded: false,
        screen: getScreenState(),
    };
}
