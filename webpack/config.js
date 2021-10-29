/* global process */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */

const pathToStaticFileFolder = '/static/';

const modeDevelopmentName = 'development';
const modeProductionName = 'production';

const nodeEnvironment = process.env.NODE_ENV;
const isDevelopment = nodeEnvironment === modeDevelopmentName;
const isProduction = nodeEnvironment === modeProductionName;
const isBuildLibrary = process.env.IS_BUILD_LIBRARY === 'true';
const isFront = process.env.SIDE === 'front';
const isBack = process.env.SIDE === 'back';
const isTsTranspileOnly = process.env.TS_TRANSPILE_ONLY === 'true';

module.exports.fileRegExp = /\.(webp|png|jpg|jpeg|gif|otf|ttf|woff|woff2|eot|mp3)$/;

module.exports.pathToStaticFileFolder = pathToStaticFileFolder;

module.exports.pathToDist = '/dist' + pathToStaticFileFolder;

module.exports.webpackDevServerPort = 9090;

module.exports.cwd = process.cwd();
module.exports.nodeEnvironment = nodeEnvironment;
module.exports.isDevelopment = isDevelopment;
module.exports.isProduction = isProduction;
module.exports.isBuildLibrary = isBuildLibrary;
module.exports.isFront = isFront;
module.exports.isBack = isBack;
module.exports.isTsTranspileOnly = isTsTranspileOnly;
