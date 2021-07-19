/* global window, document, navigator */

import {ScreenWidthNameType, SystemContextScreenType, SystemContextType} from './system-context-type';
import {screenMinWidth, screenNameReference} from './system-context-const';

function getScreenName(screenWidth: number): ScreenWidthNameType {
    if (screenWidth >= screenMinWidth.desktop) {
        return screenNameReference.desktop;
    }

    if (screenWidth >= screenMinWidth.tablet) {
        return screenNameReference.tablet;
    }

    return screenNameReference.mobile;
}

function getLittleThenList(screenWidth: number): Array<ScreenWidthNameType> {
    const littleThenList: Array<ScreenWidthNameType> = [];

    if (screenWidth < screenMinWidth.desktop) {
        littleThenList.push(screenNameReference.desktop);
    }

    if (screenWidth < screenMinWidth.tablet) {
        littleThenList.push(screenNameReference.tablet);
    }

    if (screenWidth < screenMinWidth.mobile) {
        littleThenList.push(screenNameReference.mobile);
    }

    return littleThenList;
}

function getScreenSize(): {height: number, width: number;} {
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
        isDesktop: screenName === screenNameReference.desktop,
        isLandscape,
        isMobile: screenName === screenNameReference.mobile,
        isPortrait: !isLandscape,
        isTablet: screenName === screenNameReference.tablet,
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
