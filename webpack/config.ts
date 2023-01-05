/* global process */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */

export const pathToStaticFileFolder: string = '/static/';

const modeDevelopmentName: 'development' = 'development';
const modeProductionName: 'production' = 'production';

export const isDevelopment: boolean = process.env.NODE_ENV === modeDevelopmentName;
export const isProduction: boolean = process.env.NODE_ENV === modeProductionName;
export const nodeEnvironment: 'development' | 'production' = isProduction ? modeProductionName : modeDevelopmentName;
export const isBuildLibrary: boolean = process.env.IS_BUILD_LIBRARY === 'true';
export const isFront: boolean = process.env.SIDE === 'front';
export const isBack: boolean = process.env.SIDE === 'back';
export const isServerProdBuild: boolean = process.env.IS_SERVER_PROD_BUILD === 'true';
export const isTsTranspileOnly: boolean = process.env.TS_TRANSPILE_ONLY === 'true';

export const fileRegExp: RegExp = /\.(svg|webp|png|jpg|jpeg|gif|otf|ttf|woff|woff2|eot|mp3)$/;

const pathToDistFront: string | null = isFront ? '/dist' + pathToStaticFileFolder : null;
const pathToDistBack: string | null = isBack ? '/dist-server/dist/' : null;

export const pathToDist: string = pathToDistFront || pathToDistBack || 'NO PATH DEFINED!!!';

export const webpackDevServerPort: number = 9090;

export const cwd: string = process.cwd();
