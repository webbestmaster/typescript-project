// there is real dirt workaround, but I do not know way better (((

import path from 'node:path';
import fileSystem from 'fs/promises';

import {pathToDist, cwd} from '../../config';

const {name: packageName} = require(path.join(cwd, 'package.json'));

const rootPathToStyle: string = path.join(pathToDist, '..', 'style.css');
const rootPathToTyping: string = path.join(pathToDist, '..', 'library.d.ts');

const pathToStyle: string = path.join(cwd, rootPathToStyle);
const pathToTyping: string = path.join(cwd, rootPathToTyping);

const styleDeclaration: string = `
declare module '${packageName}/dist/style.css' {
    type StyleType = Record<string, string>;

    const style: StyleType;

    export default style;
}
`;

(async () => {
    const isStyleFileExists: boolean = await fileSystem
        .access(pathToStyle)
        .then((): true => true)
        .catch((): false => false);

    if (!isStyleFileExists) {
        console.log(`[css util] file ${pathToStyle} is not exists.`);
        return;
    }

    // if library.d.ts is not exists -> throw error
    await fileSystem.access(pathToTyping);

    await fileSystem.appendFile(pathToTyping, styleDeclaration);

    console.log('[css util] declaration for css has been added.');
})();
