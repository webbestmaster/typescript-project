import path from 'node:path';

const {cwd, isProduction, isFront} = require('../../config');

const duplicateList = ['rc-resize-observer', 'isarray', '@segment/isodate', 'component-type', 'uuid', 'ms', 'debug'];

export const alias: Record<string, string> = duplicateList.reduce((accumulator, packageName) => {
    return {...accumulator, [packageName]: path.resolve(cwd, `node_modules/${packageName}`)};
}, {});

if (isProduction && isFront) {
    // remove ajv from build for prod
    alias.ajv = path.resolve(cwd, 'www', 'util', 'ajv-fake');
}
