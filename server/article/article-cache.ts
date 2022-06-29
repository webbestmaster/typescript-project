/* global process */
import path from 'path';
import {promises as fileSystemPromises} from 'fs';

import {writeStringToFile} from '../util/file';

const cwd = process.cwd();

const cacheHtmlFileFolder = 'article-cache';

const absolutePathHtmlFileFolder = path.join(cwd, cacheHtmlFileFolder);

export async function clearCacheHtmlFileFolder(): Promise<void> {
    const fileList: Array<string> = await fileSystemPromises.readdir(absolutePathHtmlFileFolder);

    const removeFileList: Array<Promise<unknown>> = fileList.map((pathToFile: string): Promise<unknown> => {
        return fileSystemPromises.unlink(path.join(absolutePathHtmlFileFolder, pathToFile));
    });

    await Promise.all(removeFileList);
}

export function makeCacheFile(slug: string, page: string): Promise<void> {
    return writeStringToFile(path.join(absolutePathHtmlFileFolder, slug + '.html'), page);
}
