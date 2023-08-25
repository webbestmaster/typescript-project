// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_google_analytics_tag

// REF: https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications

/* global window, document, setInterval */

import {useRef} from "react";

import {waitForCallback} from "../../util/time";
import {getNeedUseThirdPartyServices} from "../../util/url";

import {loadGoogleAnalyticsScript} from "./google-analytics-helper";

interface GoogleAnalyticsType {
    googleAnalyticsId: string;
    pathname: string;
}

declare global {
    interface Window {
        dataLayer?: Array<unknown>;
        ga?: (key: string, valueA: string, valueB?: string, valueC?: string) => void;
        gtag?: (key: "config" | "js", value: Date | string) => void;
    }
}

// eslint-disable-next-line complexity, max-statements
export function useGoogleAnalytics(config: GoogleAnalyticsType): null {
    const {googleAnalyticsId, pathname} = config;
    const pathnameRef = useRef<string>("");
    const isNeedUseThirdPartyServices = getNeedUseThirdPartyServices();

    if (!isNeedUseThirdPartyServices) {
        return null;
    }

    function setAndSend(updatedPathname: string): undefined {
        const {ga: definedGa} = window;

        if (!definedGa) {
            throw new Error("Google Analytics (window.ga) is not defined");
        }

        if (pathnameRef.current === updatedPathname) {
            return;
        }

        pathnameRef.current = updatedPathname;
        console.info(`%cGoogle Analytics set and send page: ${updatedPathname}`, "color: #0c0");
        definedGa("set", "page", updatedPathname);
        definedGa("send", "pageview");
    }

    if (typeof document === "undefined" || typeof window === "undefined") {
        return null;
    }

    if (window.ga) {
        setAndSend(pathname);
        return null;
    }

    loadGoogleAnalyticsScript(googleAnalyticsId);

    // eslint-disable-next-line unicorn/consistent-destructuring, @typescript-eslint/no-unnecessary-condition
    window.dataLayer ||= [];

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    function gtag(...argumentList: Array<unknown>): undefined {
        // eslint-disable-next-line prefer-rest-params, unicorn/consistent-destructuring
        window.dataLayer?.push(arguments);
    }

    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", googleAnalyticsId);

    // eslint-disable-next-line unicorn/consistent-destructuring
    waitForCallback(
        (): boolean => {
            return Boolean(window.ga);
        },
        10,
        200
    )
        .then((): void => {
            // eslint-disable-next-line id-length
            const {ga} = window;

            if (!ga) {
                console.error("[ERROR]: ga is not define");
                return;
            }

            ga("create", googleAnalyticsId, "auto");

            console.info("Google Analytics is initialized");

            setAndSend(pathname);

            // Fix pokazatel' otkazov
            setInterval(() => {
                ga("send", "event", "nobouncy", "15sec");
            }, 15e3);
        })
        .catch(console.error);

    return null;
}
