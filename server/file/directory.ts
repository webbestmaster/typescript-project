import {promises as fileSystemPromise} from 'fs';
import path from 'path';

export async function tryToMkdir(...args: Array<string>): Promise<void> {
    try {
        await fileSystemPromise.mkdir(path.join(...args));
    } catch {
        // console.log('[ERROR]: tryToMkdir: can not create folder:', path.join(...args));
    }
}
