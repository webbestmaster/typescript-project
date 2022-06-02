// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_google_analytics_tag
// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications

/* global window, document, setInterval */

import {useEffect} from 'react';

import {googleAnalyticsId} from '../../const';
import {waitForCallback} from '../../util/time';
// import {isCMS} from '../../../lib/url';
// import {promiseCatch} from '../../../lib/promise';
// import {waitForCallback} from "../../util/time";

type GoogleAnalyticsPropsType = {
    // location: Location,
};

declare global {
    interface Window {
        dataLayer?: Array<unknown>;
        ga?: (key: string, valueA: string, valueB?: string, valueC?: string) => void;
        gtag?: (key: 'config' | 'js', value: Date | string) => void;
    }
}

let isInitialized = false;

export function GoogleAnalytics(props: GoogleAnalyticsPropsType): null {
    // const {location} = props;
    // const {pathname} = location;

    const pathname = '//asdas';

    // initialize
    // eslint-disable-next-line complexity
    useEffect(
        () => {
            // if (isInitialized || isCMS(location) || typeof document === 'undefined' || typeof window === 'undefined') {
            //     return;
            // }

            if (typeof document === 'undefined' || typeof window === 'undefined') {
                return;
            }

            isInitialized = true;

            const script = document.createElement('script');

            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsId;

            const {head} = document;

            if (!head) {
                console.error('[ERROR]: document.header is not define');
                return;
            }

            head.append(script);

            window.dataLayer = window.dataLayer || [];

            function gtag(...argumentList: Array<unknown>) {
                // eslint-disable-next-line prefer-rest-params
                window.dataLayer?.push(argumentList);
            }

            window.gtag = gtag;

            gtag('js', new Date());

            gtag('config', googleAnalyticsId);

            // @ts-ignore
            waitForCallback((): boolean => Boolean(window.ga), 10, 200)
                .then((): void => {
                    console.log('window.ga');
                    console.log(window.ga);
                    console.log('window.gtag');
                    console.log(window.gtag);
                    console.log('window.dataLayer');
                    console.log(window.dataLayer);

                    // eslint-disable-next-line id-length
                    const {ga} = window;

                    if (!ga) {
                        return;
                    }

                    ga('create', googleAnalyticsId, 'auto');

                    const {location} = window;

                    ga('set', 'page', location.pathname);
                    ga('send', 'pageview');

                    // fix pokazatel' otkazov
                    setInterval((): void => {
                        ga('send', 'event', 'nobouncy', '15sec');
                    }, 15e3);
                })
                .catch(console.error);
        },
        [
            // location, pathname
        ]
    );

    // send data
    useEffect(
        () => {
            // eslint-disable-next-line id-length
            const {ga} = window;

            // do not works in first time
            // if (isCMS(location) || !window.ga) {
            //     return;
            // }
            if (!ga) {
                return;
            }

            // fix pokazatel' otkazov, see setInterval
            ga('set', 'page', pathname);
            ga('send', 'pageview');
        },
        [
            // pathname,
            // location
        ]
    );

    return null;
}
