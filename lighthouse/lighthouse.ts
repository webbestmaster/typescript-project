/* eslint no-process-env: 0 */

/* global process, URL */

/*
const cwd = process.cwd();

import path from "node:path";
import fileSystem from "node:fs/promises";

import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import { RunnerResult } from "lighthouse/types/externs";
import { SharedFlagsSettings } from "lighthouse/types/lhr/settings";

import { makeDirectory } from "../server/file/directory";

const siteUrl = "https://herrdima.github.io";

const urlList: Array<string> = [
    "/"
    // '/article/sanger-och-texter',
    // '/article/sanger-for-barn',
    // '/article/lille-katt',
    // '/article/banan-melon-kiwi-och-citron',
    // '/article/gar-det-bra',
];

/!*
type LighthouseResultLhrCategoriesType = Record<
    LighthouseCategoryNameType,
    LighthouseResultLhrCategoryType
>;

export declare type LighthouseResultLhrType = {
    categories: LighthouseResultLhrCategoriesType;
};

type LighthouseResultType = {
    lhr: LighthouseResultLhrType;
    report: string;
};
*!/


// type LighthouseCategoryNameType = "accessibility" | "best-practices" | "performance" | "pwa" | "seo";

// type LighthouseFormFactorType = string;

// type LighthouseResultLhrCategoryType = {
//     id: string;
//     score: number;
//     title: string;
// };

// type ResultItemType = {
//     categories: LighthouseResultLhrCategoriesType;
//     formFactor: LighthouseFormFactorType;
//     url: string;
// };

const threshold: Record<string, number> = {
    accessibility: 1,
    "best-practices": 1,
    performance: 0.95,
    pwa: 0.5,
    seo: 1
};

const categoryNameList: Array<LighthouseCategoryNameType> = [
    "performance",
    "accessibility",
    "best-practices",
    "seo",
    "pwa"
];

function checkResultItem(resultItem: ResultItemType) {
    const { categories, formFactor, url } = resultItem;

    categoryNameList.forEach((categoryName: LighthouseCategoryNameType) => {
        const { score, title } = categories[categoryName];
        const minimalScore = threshold[categoryName];

        if (score < minimalScore) {
            console.log(
                // eslint-disable-next-line max-len
                `[ERROR] url: ${url}, form factor: ${formFactor}, title: ${title}, score: ${score}, threshold: ${minimalScore}`
            );
        }
    });
}

async function getLighthouseResult(
    config: { port: number, url: string }
): Promise<Record<"desktop" | "mobile", RunnerResult>> {
    const { url, port } = config;

    const desktop: RunnerResult | undefined = await lighthouse(url, {
        disableStorageReset: false,
        formFactor: "desktop",
        logLevel: "silent",
        output: "html",
        port,
        screenEmulation: {
            // deviceScaleRatio: 1,
            // turn on / turin off emulation
            disabled: false,
            height: 800,
            mobile: false,
            width: 980
        },
        throttlingMethod: "provided"
    });

    const mobile: RunnerResult | undefined = await lighthouse(url, {
        disableStorageReset: false,
        formFactor: "mobile",
        logLevel: "silent",
        output: "html",
        port,
        screenEmulation: {
            // deviceScaleRatio: 1,
            // turn on / turin off emulation
            disabled: false,
            height: 480,
            mobile: true,
            width: 320
        },
        throttlingMethod: "provided"
    });

    if (!desktop || !mobile) {
        throw new Error("The result is not defined!");
    }

    return { desktop, mobile };
}


// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: true
    });

    const { port } = new URL(browser.wsEndpoint());

    await makeDirectory(path.join(cwd, "lighthouse/report"));

    const resultList: Array<RunnerResult> = [];

    // eslint-disable-next-line no-loops/no-loops
    for (const url of urlList) {
        const lighthouseResult: Record<"desktop" | "mobile", RunnerResult> = await getLighthouseResult({
            port: Number.parseInt(port, 10),
            url: siteUrl + url
        });

        if (!lighthouseResult) {
            return;
        }

        await fileSystem.writeFile(
            path.join(cwd, `/lighthouse/report/url-${url.replace(/\//gi, "_")}-mobile.html`),
            lighthouseResult.mobile.report
        );

        resultList.push({
            categories: lighthouseResult.mobile.lhr.categories,
            formFactor: "mobile",
            url
        });

        await fileSystem.writeFile(
            path.join(cwd, `/lighthouse/report/url-${url.replace(/\//gi, "_")}-desktop.html`),
            lighthouseResult.desktop.report
        );

        resultList.push({
            categories: lighthouseResult.desktop.lhr.categories,
            formFactor: "desktop",
            url
        });
    }

    resultList.forEach(checkResultItem);

    await browser.close();
})();
*/
