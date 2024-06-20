/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll", "beforeEach", "afterEach", "afterAll"] }] */

import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import type {Browser, Page} from "puppeteer";

import {createBrowser, makeLogin} from "./util/util";

describe("auth", () => {
    let browser: Browser | null = null;
    let page: Page | null = null;

    beforeAll(async () => {
        browser = await createBrowser();
    });

    beforeEach(async () => {
        page = (await browser?.newPage()) ?? null;
    });

    afterEach(async () => {
        await page?.close();
    });

    afterAll(async () => {
        await browser?.close();
    });

    it("login", async () => {
        expect.assertions(0);
        await makeLogin(page);
    });
});
