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

function getScreenSize(): {width: number; height: number} {
    const defaultSize = {
        width: screenMinWidth.desktop,
        height: screenMinWidth.desktop,
    };

    if (typeof document === 'undefined') {
        return defaultSize;
    }

    const {documentElement} = document;

    if (!documentElement) {
        return defaultSize;
    }

    const {clientWidth: width, clientHeight: height} = documentElement;

    return {width, height};
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
        width,
        height,
        name: screenName,
        littleThenList: getLittleThenList(width),
        isDesktop: screenName === screenNameReference.desktop,
        isTablet: screenName === screenNameReference.tablet,
        isMobile: screenName === screenNameReference.mobile,
        isLandscape,
        isPortrait: !isLandscape,
        devicePixelRatio: getDevicePixelRatio(),
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
        screen: getScreenState(),
        isScriptLoaded: typeof window !== 'undefined',
        isWindowLoaded: false,
        isIOS: getIsIOS(),
        isAndroid: getIsAndroid(),
    };
}
