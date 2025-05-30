import {launch} from "chrome-launcher";

enum CategoryNameEnum {
    accessibility = "accessibility",
    bestPractices = "best-practices",
    performance = "performance",
    pwa = "pwa",
    seo = "seo",
}

enum FormFactorEnum {
    desktop = "desktop",
    mobile = "mobile",
}

interface MakeReportArgumentType {
    formFactor: FormFactorEnum;
    port: number;
    url: string;
}

const threshold: Record<CategoryNameEnum, number> = {
    [CategoryNameEnum.accessibility]: 1,
    [CategoryNameEnum.bestPractices]: 1,
    [CategoryNameEnum.performance]: 0.95,
    [CategoryNameEnum.pwa]: 0.5,
    [CategoryNameEnum.seo]: 1,
};

// const siteUrl = 'https://herrdima.github.io';
const siteUrl = "http://localhost:3011";

const categoryNameList: Array<CategoryNameEnum> = Object.values(CategoryNameEnum);

// const categoryNameList: Array<CategoryNameEnum> = [CategoryNameEnum.bestPractices];

async function makeReport(config: MakeReportArgumentType): Promise<void> {
    const {url, port, formFactor} = config;
    const {"default": lighthouse} = await import("lighthouse");

    // const options = {logLevel: 'info', output: 'html', port: chrome.port} as const;
    const options = {
        // logLevel?: 'silent'|'error'|'warn'|'info'|'verbose';
        logLevel: "warn",
        onlyCategories: categoryNameList,
        output: "json",
        port,
        settings: {formFactor},
    } as const;
    const runnerResult = await lighthouse(`${siteUrl}${url}`, options);

    if (!runnerResult) {
        console.log(`[Error]: can not open: ${url}`);
        return;
    }

    const {categories} = runnerResult.lhr;

    categoryNameList.forEach((categoryName: CategoryNameEnum) => {
        const {score, title} = categories[categoryName];
        const minimalScore = threshold[categoryName];

        if (typeof score !== "number") {
            throw new TypeError("[checkResultItem]: score is NOT a number");
        }

        if (score < minimalScore) {
            console.log(
                // eslint-disable-next-line max-len
                `[ERROR] url: ${siteUrl}${url}, form factor: ${formFactor}, category: ${title}, score: ${score}, threshold: ${minimalScore}`
            );
        }
    });

    /*
        if (!runnerResult?.report) {
            console.log(`[Error]: can not open: ${url}`);
        }

        const reportHtml = (runnerResult?.report || []).toString();

        const reportFileName = url === '/' ? 'root' : url.replace('/', '').replace(/\//gi, '__');

        const reportFolderName = 'lighthouse-report'

        await tryToMakeDirectorySilent(reportFolderName)
        await tryToMakeDirectorySilent(`${reportFileName}/${formFactor}`)

        await fileSystem.writeFile(`${reportFileName}/${formFactor}/${reportFileName}.html`, reportHtml);
    */
}

const urlList: Array<string> = [
    "/article/lille-katt",
    "/article/hej-sa-petronella",
    "/article/en-elefant-balanserade",
    "/article/har-du-sett-min-lilla-katt",
    "/article/den-olydiga-ballongens-visa",
    "/article/dar-gaddan-simmar",
    "/article/donkey-kong",
    "/article/hooja",
    "/article/gar-det-bra",
    "/article/miss-li",
    "/article/musikband",
    "/article/sanger-for-barn",
    "/article/x",
    "/article/sverige",
    "/article/svenska-nationalsangen-du-gamla-du-fria",
    "/",
    "/article/sanger-och-texter",
    "/article/banan-melon-kiwi-och-citron",
    "/article/levererar",
    "/article/vi-ar-nummer-ett",
];

async function innerInitialization(): Promise<undefined> {
    const chrome = await launch({chromeFlags: ["--headless"]});

    for (const url of urlList) {
        // eslint-disable-next-line no-await-in-loop
        await makeReport({
            formFactor: FormFactorEnum.mobile,
            port: chrome.port,
            url,
        });
        // eslint-disable-next-line no-await-in-loop
        await makeReport({
            formFactor: FormFactorEnum.desktop,
            port: chrome.port,
            url,
        });
    }

    chrome.kill();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
innerInitialization();

/*

const cwd = process.cwd();

import path from 'node:path';
import fileSystem from 'node:fs/promises';

import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import {RunnerResult} from 'lighthouse/types/externs';

import {makeDirectory} from '../server/file/directory';

const siteUrl = 'https://herrdima.github.io';

const urlList: Array<string> = [
    '/',
    // '/article/sanger-och-texter',
    // '/article/sanger-for-barn',
    // '/article/lille-katt',
    // '/article/banan-melon-kiwi-och-citron',
    // '/article/gar-det-bra',
];

type FormFactorType = 'desktop' | 'mobile';

type CategoryNameType = 'accessibility' | 'best-practices' | 'performance' | 'pwa' | 'seo';

type RunnerResultItemType = {
    formFactor: FormFactorType;
    result: RunnerResult;
    url: string;
};

const threshold: Record<CategoryNameType, number> = {
    accessibility: 1,
    'best-practices': 1,
    performance: 0.95,
    pwa: 0.5,
    seo: 1,
};

const categoryNameList: Array<CategoryNameType> = ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'];

function checkResultItem(resultItem: RunnerResultItemType) {
    const {result, formFactor, url} = resultItem;

    categoryNameList.forEach((categoryName: CategoryNameType) => {
        const {score, title} = result.lhr.categories[categoryName];
        const minimalScore = threshold[categoryName];

        if (score === null) {
            throw new Error('[checkResultItem]: score is null');
        }

        if (score < minimalScore) {
            console.log(
                // eslint-disable-next-line max-len
                `[ERROR] url: ${url}, form factor: ${formFactor}, title: ${title}, score: ${score}, threshold: ${minimalScore}`
            );
        }
    });
}

type GetLighthouseResultConfigType = {
    port: number;
    url: string;
};

async function getLighthouseResult(
    config: GetLighthouseResultConfigType
): Promise<Record<FormFactorType, RunnerResult>> {
    const {url, port} = config;

    const desktop: RunnerResult | undefined = await lighthouse(url, {
        disableStorageReset: false,
        formFactor: 'desktop',
        logLevel: 'silent',
        onlyCategories: categoryNameList,
        output: 'html',
        port,
        screenEmulation: {
            // deviceScaleRatio: 1,
            // turn on / turin off emulation
            disabled: false,
            height: 800,
            mobile: false,
            width: 980,
        },
        throttlingMethod: 'provided',
    });

    const mobile: RunnerResult | undefined = await lighthouse(url, {
        disableStorageReset: false,
        formFactor: 'mobile',
        logLevel: 'silent',
        onlyCategories: categoryNameList,
        output: 'html',
        port,
        screenEmulation: {
            // deviceScaleRatio: 1,
            // turn on / turin off emulation
            disabled: false,
            height: 480,
            mobile: true,
            width: 320,
        },
        throttlingMethod: 'provided',
    });

    if (!desktop || !mobile) {
        throw new Error('The result is not defined!');
    }

    return {desktop, mobile};
}

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: true,
    });

    const {port} = new URL(browser.wsEndpoint());

    await makeDirectory(path.join(cwd, 'lighthouse/report'));

    const resultList: Array<RunnerResultItemType> = [];

    for (const url of urlList) {
        const lighthouseResult: Record<FormFactorType, RunnerResult> = await getLighthouseResult({
            port: Number.parseInt(port, 10),
            url: siteUrl + url,
        });

        await fileSystem.writeFile(
            path.join(cwd, `/lighthouse/report/url-${url.replace(/\//gi, '_')}-mobile.html`),
            lighthouseResult.mobile.report
        );

        resultList.push({
            formFactor: 'mobile',
            result: lighthouseResult.mobile,
            url,
        });

        await fileSystem.writeFile(
            path.join(cwd, `/lighthouse/report/url-${url.replace(/\//gi, '_')}-desktop.html`),
            lighthouseResult.desktop.report
        );

        resultList.push({
            formFactor: 'desktop',
            result: lighthouseResult.desktop,
            url,
        });
    }

    resultList.forEach(checkResultItem);

    await browser.close();
})();
*/
