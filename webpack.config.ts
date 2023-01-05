import path from "node:path";

import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { optimization } from "./webpack/setting/optimization";
import { rules } from "./webpack/setting/module/rules";
import { alias } from "./webpack/setting/resolve/alias";
import { extensions } from "./webpack/setting/resolve/extensions";
import { plugins } from "./webpack/setting/plugins";
import { devServer } from "./webpack/setting/dev-server";
import { watchOptions } from "./webpack/setting/watch-options";

const externals = [nodeExternals()]; // in order to ignore all modules in node_modules folder
const externalsPresets = { node: true }; // in order to ignore built-in modules like path, fs, etc.

import {
    pathToStaticFileFolder,
    isDevelopment,
    // isProduction,
    pathToDist as pathToDistribution,
    cwd,
    nodeEnvironment,
    isBuildLibrary,
    isFront,
    isBack
    // isServerProdBuild,
} from "./webpack/config";

const configFront: Configuration = {
    devtool: "source-map", // isDevelopment ? 'source-map' : false,
    entry: [
        "./www/css/root.scss",
        "markdown-pro/dist/style.css",
        "react-audio-player-pro/dist/style.css",
        "./www/root.tsx"
    ],
    mode: nodeEnvironment,
    module: { rules },
    // optimization,
    output: {
        assetModuleFilename: isDevelopment
            ? "build-asset/[name]----[hash:6][ext][query]"
            : "build-asset/[hash:6][ext][query]",
        chunkFilename: isDevelopment ? "[name].chunk.js" : "[name].[hash:6].chunk.js",
        filename: isDevelopment ? "[name].js" : "index.js",
        path: path.join(cwd, pathToDistribution),
        pathinfo: false,
        publicPath: isDevelopment ? "/" : pathToStaticFileFolder
    },
    plugins,
    resolve: { alias, extensions }
    // devServer,
    // watchOptions: watchOptions,
};

const configBack: Configuration = {
    ...configFront,
    devtool: "source-map", // isServerProdBuild ? false : 'source-map',
    entry: ["./server/server.tsx"],
    externals,
    externalsPresets,
    // optimization: {minimize: false},
    target: "node"
};

const configLibraryFront: Configuration = {
    devtool: false,
    entry: ["./www/library/library.ts"],
    externals,
    externalsPresets,
    mode: nodeEnvironment,
    module: { rules },
    // optimization,
    output: {
        filename: "index.js",
        libraryTarget: "commonjs2",
        path: path.join(cwd, "dist"),
        pathinfo: false,
        publicPath: ""
    },
    // devServer,
    plugins,
    resolve: { alias, extensions }
    // watchOptions: watchOptions,

    /*
    externals: {
        // Don't bundle react and react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
        'react-router-dom': {
            commonjs: 'react-router-dom',
            commonjs2: 'react-router-dom',
            amd: 'ReactRouterDOM',
            root: 'ReactRouterDOM',
        },
    },
*/
};

const configLibraryBack: Configuration = { ...configLibraryFront };

let webpackConfigBySide = null;

webpackConfigBySide = isFront ? configFront : webpackConfigBySide;
webpackConfigBySide = isBack ? configBack : webpackConfigBySide;

let webpackConfigBuildLibraryBySide = null;

webpackConfigBuildLibraryBySide = isFront ? configLibraryFront : webpackConfigBuildLibraryBySide;
webpackConfigBuildLibraryBySide = isBack ? configLibraryBack : webpackConfigBuildLibraryBySide;

const webpackConfig: Configuration | null = isBuildLibrary ? webpackConfigBuildLibraryBySide : webpackConfigBySide;

// webpackConfig?.plugins?.push(new BundleAnalyzerPlugin());

// eslint-disable-next-line import/no-default-export
export default { ...webpackConfig, devServer, optimization, watchOptions };
