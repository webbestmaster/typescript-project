// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_google_analytics_tag
// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications

/* global window, document, setInterval */

import {useRef} from 'react';

import {waitForCallback} from '../../util/time';
// import {isCMS} from '../../../lib/url';
// import {promiseCatch} from '../../../lib/promise';
// import {waitForCallback} from "../../util/time";

type GoogleAnalyticsType = {
    googleAnalyticsId: string;
    pathname: string;
};

declare global {
    interface Window {
        dataLayer?: Array<unknown>;
        ga?: (key: string, valueA: string, valueB?: string, valueC?: string) => void;
        gtag?: (key: 'config' | 'js', value: Date | string) => void;
    }
}

// eslint-disable-next-line complexity, max-statements
export function useGoogleAnalytics(config: GoogleAnalyticsType): null {
    const {googleAnalyticsId, pathname} = config;
    const pathnameRef = useRef<string>('');

    function setAndSend(newPathname: string) {
        const {ga: definedGa} = window;

        if (definedGa && pathnameRef.current !== newPathname) {
            pathnameRef.current = newPathname;
            console.info(`%cGoogle Analytics set and send page: ${newPathname}`, 'color: #0c0');
            definedGa('set', 'page', newPathname);
            definedGa('send', 'pageview');
        }
    }

    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return null;
    }

    if (window.ga) {
        setAndSend(pathname);
        return null;
    }

    const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;

    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
        console.info('Google Analytics script already exists');
        return null;
    }

    const script = document.createElement('script');

    script.async = true;
    script.src = scriptSrc;

    const {head} = document;

    if (!head) {
        console.error('[ERROR]: document.header is not define');
        return null;
    }

    head.append(script);

    // eslint-disable-next-line unicorn/consistent-destructuring
    window.dataLayer = window.dataLayer || [];

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    function gtag(...argumentList: Array<unknown>) {
        // eslint-disable-next-line prefer-rest-params, unicorn/consistent-destructuring
        window.dataLayer?.push(arguments);
    }

    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', googleAnalyticsId);

    // eslint-disable-next-line unicorn/consistent-destructuring
    waitForCallback((): boolean => Boolean(window.ga), 10, 200)
        .then((): void => {
            // eslint-disable-next-line id-length
            const {ga} = window;

            if (!ga) {
                console.error('[ERROR]: ga is not define');
                return;
            }

            ga('create', googleAnalyticsId, 'auto');
            setAndSend(pathname);

            // fix pokazatel' otkazov
            setInterval((): unknown => ga('send', 'event', 'nobouncy', '15sec'), 15e3);

            console.info('Google Analytics is initialized');
        })
        .catch(console.error);

    return null;
}
