/* global process */
import path from 'path';
import {promises as fileSystemPromises} from 'fs';

import {writeStringToFile} from '../util/file';

const cwd = process.cwd();

export const cacheHtmlFileFolder = 'article-cache';

const absolutePathHtmlFileFolder = path.join(cwd, cacheHtmlFileFolder);

export async function clearCacheHtmlFileFolder(): Promise<void> {
    try {
        await fileSystemPromises.rm(absolutePathHtmlFileFolder, {recursive: true});
    } catch (error: unknown) {
        console.info(error);
    }

    try {
        await fileSystemPromises.mkdir(absolutePathHtmlFileFolder);
    } catch (error: unknown) {
        console.info(error);
    }
}

export function makeCacheFile(slug: string, page: string): Promise<void> {
    return writeStringToFile(path.join(absolutePathHtmlFileFolder, slug + '.html'), page);
}
