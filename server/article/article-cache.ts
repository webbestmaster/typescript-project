/* global process */
import path from 'node:path';

import {writeStringToFile} from '../util/file';
import {tryToMakeDirectory, tryToRemoveDirectory} from '../file/directory';

const cwd = process.cwd();

const cacheHtmlFileFolder = 'article-cache';

const absolutePathHtmlFileFolder = path.join(cwd, cacheHtmlFileFolder);

export async function clearCacheHtmlFileFolder(): Promise<void> {
    await tryToRemoveDirectory(absolutePathHtmlFileFolder);
    await tryToMakeDirectory(absolutePathHtmlFileFolder);
}

export function makeCacheFile(slug: string, page: string): Promise<void> {
    return writeStringToFile(path.join(absolutePathHtmlFileFolder, slug + '.html'), page);
}
