/* global Buffer */

import puppeteer from "puppeteer";

import type {FastifyRequest} from "fastify";

async function htmlToPdf(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
        args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-sandbox", "--incognito"],
        headless: true,
    });

    const context = await browser.createBrowserContext();

    const page = await context.newPage();

    await page.setJavaScriptEnabled(false);

    await page.setContent(html, {waitUntil: "networkidle0"});

    const pdf = await page.pdf({
        preferCSSPageSize: true,
        printBackground: true,
    });

    await page.close();

    await context.close();

    await browser.close();

    return pdf;
}

// eslint-disable-next-line require-await
export async function getPdf(request: FastifyRequest<{Body?: string}>): Promise<Buffer> {
    const {body} = request;

    const rawHtml = String(body ?? "");

    const html = decodeURIComponent(rawHtml);

    return htmlToPdf(html);
}
