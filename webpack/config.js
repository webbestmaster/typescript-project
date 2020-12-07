/* global process */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */

const modeDevelopmentName = 'development';
const modeProductionName = 'production';

const nodeEnvironment = process.env.NODE_ENV || modeDevelopmentName;

// module.exports.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
module.exports.isBuildServer = process.env.IS_BUILD_SERVER === 'YES';
module.exports.nodeEnvironment = nodeEnvironment;

module.exports.isDevelopment = nodeEnvironment === modeDevelopmentName;
module.exports.isProduction = nodeEnvironment === modeProductionName;

module.exports.cwd = process.cwd();

module.exports.fileRegExp = /\.(webp|png|jpg|jpeg|gif|svg|otf|ttf|woff2?|mp3)$/;

module.exports.pathToDist = '/dist';

// static - html, js, css - static working files
module.exports.pathToStaticFileFolder = ''; // '/static';
// file - png, jpg, svg, mp4 - files (usual images) which used in UI
module.exports.pathToLoadedFileFolder = '/file';

module.exports.webpackDevServerPort = 9090;
module.exports.ssrHttpServerPortProduction = 80;
module.exports.ssrHttpsServerPortProduction = 443;
