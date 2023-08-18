/* global window, setInterval, clearInterval */
import {useState, useRef, useEffect} from "react";
import {useLocation} from "react-router-dom";

import {googleAdSenseId} from "../../../const";
import {cls} from "../../../util/css";
import {waitForCallback} from "../../../util/time";
import {getRandomString} from "../../../util/string";
import {getNeedUseThirdPartyServices} from "../../../util/url";

import {loadAdSenseScript} from "./ad-sense-helper";

interface AdSenseAdsPropsType {
    readonly adSlotId: string;
    // eslint-disable-next-line unicorn/no-keyword-prefix
    readonly className?: string;
}

declare global {
    interface Window {
        adsbygoogle?: Array<unknown>;
    }
}

export function AdSenseAds(props: AdSenseAdsPropsType): JSX.Element {
    const {className: cssClassName, adSlotId} = props;
    const [adNodeId, setAdNodeId] = useState<string>(getRandomString());
    const routerLocation = useLocation();
    const pathnameRef = useRef<string>("");
    const isNeedUseThirdPartyServices = getNeedUseThirdPartyServices();

    if (isNeedUseThirdPartyServices) {
        loadAdSenseScript(googleAdSenseId);
    }

    useEffect(() => {
        const adsPeriodUpdate = 60e3;

        const intervalId = setInterval(() => {
            console.info(`update setTimeout for ads, adSlotId: ${adSlotId}`);
            setAdNodeId(getRandomString());
        }, adsPeriodUpdate);

        return () => {
            console.info(`clear setTimeout for ads, adSlotId: ${adSlotId}`);
            clearInterval(intervalId);
        };
    }, [adSlotId]);

    function showAd(updatedPathname: string, updatedAdNodeId: string) {
        if (!isNeedUseThirdPartyServices) {
            return;
        }

        if (pathnameRef.current === updatedPathname + updatedAdNodeId) {
            console.info(`%cAdSense, stop extra show ads: ${updatedPathname}, ${updatedAdNodeId}`, "color: #c00");
            return;
        }

        pathnameRef.current = updatedPathname + updatedAdNodeId;

        if (typeof window === "undefined") {
            return;
        }

        waitForCallback(
            (): boolean => {
                return Boolean(window.adsbygoogle);
            },
            10,
            100
        )
            .then(() => {
                console.info(`%cAdSense, show ads, adSlotId: ${adSlotId}`, "color: #c00");

                window.adsbygoogle?.push({
                    // eslint-disable-next-line camelcase, id-match, babel/camelcase
                    google_ad_client: googleAdSenseId,
                    // eslint-disable-next-line camelcase, id-match, babel/camelcase
                    google_ad_slot: adSlotId,
                });
            })
            .catch(console.error);
    }

    showAd(routerLocation.pathname, adNodeId);

    return (
        <ins
            className={cls("adsbygoogle", cssClassName)}
            data-ad-client={googleAdSenseId}
            data-ad-format="auto"
            data-ad-slot={adSlotId}
            data-custom-ad-node-id={adNodeId}
            data-full-width-responsive="true"
            key={adNodeId}
            style={{display: "block"}}
        />
    );
}
