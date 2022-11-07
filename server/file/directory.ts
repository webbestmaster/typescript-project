import {promises as fileSystemPromise} from 'fs';
import path from 'path';

export async function tryToMakeDirectory(...args: Array<string>): Promise<void> {
    try {
        await fileSystemPromise.mkdir(path.join(...args));
    } catch {
        // console.log('[ERROR]: tryToMkdir: can not create folder:', path.join(...args));
    }
}

export async function tryToRemoveDirectory(...args: Array<string>): Promise<void> {
    try {
        await fileSystemPromise.rmdir(path.join(...args), {recursive: true});
    } catch {
        // console.log('[ERROR]: tryToMkdir: can not create folder:', path.join(...args));
    }
}
