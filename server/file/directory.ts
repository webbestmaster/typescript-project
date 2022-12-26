import fileSystem from 'node:fs/promises';
import path from 'node:path';

export async function tryToMakeDirectory(...args: Array<string>): Promise<void> {
    try {
        await fileSystem.mkdir(path.join(...args));
    } catch {
        // console.log('[ERROR]: tryToMkdir: can not create folder:', path.join(...args));
    }
}

export async function tryToRemoveDirectory(...args: Array<string>): Promise<void> {
    try {
        await fileSystem.rmdir(path.join(...args), {recursive: true});
    } catch {
        // console.log('[ERROR]: tryToMkdir: can not create folder:', path.join(...args));
    }
}
