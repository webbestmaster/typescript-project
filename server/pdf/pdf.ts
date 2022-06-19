/* global Buffer */

import puppeteer from 'puppeteer';

import {FastifyReply, FastifyRequest} from 'fastify';

async function htmlToPdf(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
        args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
        headless: true,
    });

    const page = await browser.newPage();

    await page.setJavaScriptEnabled(false);

    await page.setContent(html, {waitUntil: 'networkidle0'}); // 4

    const pdf = await page.pdf({
        preferCSSPageSize: true,
        printBackground: true,
    });

    await page.close();

    await browser.close();

    return pdf;
}

export async function getPdf(request: FastifyRequest<{Body?: string}>, reply: FastifyReply): Promise<void> {
    const {body} = request;

    const rawHtml = String(body || '');

    const html = decodeURIComponent(rawHtml);

    const pdf = await htmlToPdf(html);

    reply.send(pdf);
}
