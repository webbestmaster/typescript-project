/* global process */
import path from 'path';
import {promises as fileSystemPromises} from 'fs';

import {getIsKeepFileName, writeStringToFile} from '../util/file';

const cwd = process.cwd();

const cacheHtmlFileFolder = 'article-cache';

const absolutePathHtmlFileFolder = path.join(cwd, cacheHtmlFileFolder);

export async function clearCacheHtmlFileFolder(): Promise<void> {
    const fileNameList: Array<string> = await fileSystemPromises.readdir(absolutePathHtmlFileFolder);

    const removeFileList: Array<Promise<unknown>> = fileNameList.map((fileName: string): Promise<unknown> => {
        if (getIsKeepFileName(fileName)) {
            return Promise.resolve();
        }

        return fileSystemPromises.unlink(path.join(absolutePathHtmlFileFolder, fileName));
    });

    await Promise.all(removeFileList);
}

export function makeCacheFile(slug: string, page: string): Promise<void> {
    return writeStringToFile(path.join(absolutePathHtmlFileFolder, slug + '.html'), page);
}
