// @flow

/* global before, after, describe, it */

import assert from 'assert';

import puppeteer, {Browser, Page} from 'puppeteer';

function sum(numberA: number, numberB: number): number {
    return numberA + numberB;
}

let browser: Browser | null = null;

// puppeteer options
const options = {
    headless: false,
    slowMo: 100,
    timeout: 10_000,
};

// expose variables
before(async () => {
    // console.log('before 1 begin');
    browser = await puppeteer.launch(options);
    // console.log('before 1 end');
});

// close browser and reset global variables
after(async () => {
    // console.log('after 1 begin');
    await browser?.close();
    // console.log('after 1 end');
});

describe('Smoke test', () => {
    let page: Page | null = null;

    before(async () => {
        // console.log('before 2 begin');
        page = (await browser?.newPage()) || null;
        await page?.goto('https://mvp0.rocketdata.io', {
            waitUntil: 'networkidle0',
        });
        // console.log('before 2 end');
    });

    after(async () => {
        // console.log('after 2 begin');
        await page?.close();
        // console.log('after 2 end');
    });

    it('Login', async () => {
        // await page?.waitForIdle({waitUntil: 'networkidle0'});
        assert(sum(1, 2) === 3, '1 + 2 === 3');
    });
});
