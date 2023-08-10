import {describe, it, afterEach, beforeEach, afterAll, beforeAll} from '@jest/globals';

import {Browser, Page} from 'puppeteer';

import {createBrowser, makeLogin} from './util/util';

let browser: Browser | null = null;

beforeAll(async () => {
    browser = await createBrowser();
});

afterAll(async () => {
    await browser?.close();
});

describe('auth', () => {
    let page: Page | null = null;

    beforeEach(async () => {
        page = (await browser?.newPage()) || null;
    });

    afterEach(async () => {
        await page?.close();
    });

    it('login', async () => {
        await makeLogin(page);
    });
});
