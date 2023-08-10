import {describe, it, afterEach, beforeEach, afterAll, beforeAll, expect} from '@jest/globals';

import {Browser, Page} from 'puppeteer';

import {createBrowser, makeLogin} from './util/util';
import {defaultPageGoToOption, pageFullUrl} from './util/const';

let browser: Browser | null = null;

describe('reviews', () => {
    let page: Page | null = null;

    beforeAll(async () => {
        browser = await createBrowser();
    });

    beforeEach(async () => {
        page = (await browser?.newPage()) || null;
        await makeLogin(page);
    });

    afterEach(async () => {
        await page?.close();
    });

    afterAll(async () => {
        await browser?.close();
    });

    it('review list', async () => {
        expect.assertions(0);
        await page?.goto(pageFullUrl.reviewsManagementReviews, defaultPageGoToOption);

        // review should contain at least one review, main ul li svg[fill=currentColor] - rating selector
        await page?.waitForSelector('main ul li svg[fill=currentColor]', {timeout: 5e3});
    });
});
