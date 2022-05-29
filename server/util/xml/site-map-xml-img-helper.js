// @flow

/* global process */

import path from 'path';
import fileSystem from 'fs';

import request from 'request';

import type {MongoDocumentType} from '../database/database-type';
import {rootDocumentId, rootDocumentSlug} from '../api/part/document-api-const';
import {protocolHostingDomainName} from '../config';
import {getLinkToReadArticle} from '../../../www/js/lib/string';
import {isError, isNotString, isString} from '../../../www/js/lib/is';
import {pathToDist, isProduction} from '../../../webpack/config';
import type {PromiseResolveType} from '../../../www/js/lib/promise';

import {getAllDocumentList} from './document-helper';
import {waitForTime} from './time';

const CWD = process.cwd();

function getLocTagContent(mongoDocument: MongoDocumentType): string {
    const {slug} = mongoDocument;

    if (slug === rootDocumentSlug) {
        return protocolHostingDomainName + '/';
    }

    return protocolHostingDomainName + getLinkToReadArticle(slug);
}

type ImageDataType = {|
    +src: string,
    +alt: string,
|};

async function getPageImageDataList(url: string): Promise<Array<ImageDataType> | Error> {
    return new Promise((resolve: PromiseResolveType<Array<ImageDataType> | Error>) => {
        request(
            {
                uri: protocolHostingDomainName + url,
            },
            (error: ?Error, response: Response, body: ?string) => {
                if (isNotString(body)) {
                    console.error('[ERROR]: getPageContent: can not get data from: ' + url);

                    resolve(new Error('Can not get data from: ' + url));
                    return;
                }

                const matchedMainString = body.match(/<main[\S\s]*?>[\S\s]*?<\/main>/);

                if (!matchedMainString) {
                    console.error('[ERROR]: getPageContent: can not get matchedMainString from: ' + url);

                    resolve(new Error('Can not get matchedMainString from: ' + url));
                    return;
                }

                const [mainString] = matchedMainString;

                const imgTagList = isString(mainString) ? mainString.match(/<img[\S\s]*?>/gi) : null;

                if (!Array.isArray(imgTagList)) {
                    resolve([]);
                    return;
                }

                const imageDataList: Array<ImageDataType> = imgTagList.map<ImageDataType>(
                    (imageTag: string): ImageDataType => {
                        const matchedSrc = imageTag.match(/src="(\S*?)"/);
                        const src = matchedSrc ? matchedSrc[1] : '';
                        const matchedAlt = imageTag.match(/alt="([\S\s]*?)"/);
                        const alt = matchedAlt ? matchedAlt[1] : '';

                        return {alt, src};
                    }
                );

                resolve(imageDataList);
            }
        );
    });
}

function imageDataToImageXmlTag(imageData: ImageDataType): string {
    const {src, alt} = imageData;

    const escapedSrc = src.replace(/&/g, '&amp;');

    return [
        '        <image:image>',
        `            <image:loc>${protocolHostingDomainName + escapedSrc}</image:loc>`,
        // -- `            <image:caption>${getLastmodTagContent(mongoDocument)}</image:caption>`,
        // -- `            <image:geo_location>${getLastmodTagContent(mongoDocument)}</image:geo_location>`,
        `            <image:title>${alt}</image:title>`,
        // -- `            <image:license>${getLastmodTagContent(mongoDocument)}</image:license>`,
        '        </image:image>',
    ].join('\n');
}

async function mongoDocumentToSiteMapImgXml(mongoDocument: MongoDocumentType): Promise<string> {
    const {slug, id} = mongoDocument;
    const pathToArticle = id === rootDocumentId ? '/' : getLinkToReadArticle(slug);
    const pageImageDataList = await getPageImageDataList(pathToArticle);

    if (isError(pageImageDataList)) {
        console.error('[ERROR] mongoDocumentToSiteMapImgXml: can not getPageImageDataList');
        return '';
    }

    return [
        '    <url>',
        `        <loc>${getLocTagContent(mongoDocument)}</loc>`,
        [...new Set(pageImageDataList.map(imageDataToImageXmlTag))].join('\n'),
        '    </url>',
    ].join('\n');
}

// eslint-disable-next-line complexity
async function getSiteMapImgXml(): Promise<string | Error> {
    const documentList = await getAllDocumentList();

    if (isError(documentList)) {
        return documentList;
    }

    const urlList: Array<string> = [];

    // eslint-disable-next-line no-loops/no-loops
    for (const documentInList of documentList) {
        const {isActive, isInSiteMap} = documentInList;

        const isNeedSiteMapImgXml = isActive && isInSiteMap && isProduction;

        const xml = isNeedSiteMapImgXml ? await mongoDocumentToSiteMapImgXml(documentInList) : '';

        if (xml && isString(xml)) {
            urlList.push(xml);
        }
    }

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        urlList.join('\n'),
        '</urlset>',
    ].join('\n');
}

export async function updateSiteMapImgXml(): Promise<null | Error> {
    const siteMapImgXmlString = await getSiteMapImgXml();

    if (isError(siteMapImgXmlString)) {
        return siteMapImgXmlString;
    }

    return new Promise((resolve: PromiseResolveType<null | Error>) => {
        const pathToFile = path.join(CWD, pathToDist, '/sitemap-img.xml');

        fileSystem.writeFile(pathToFile, siteMapImgXmlString, (error: Error | mixed) => {
            if (isError(error)) {
                resolve(error);
                return;
            }

            resolve(null);
        });
    });
}
