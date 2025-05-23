import CircularDependencyPlugin from "circular-dependency-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import {
    type Compiler,
    type Configuration,
    ContextReplacementPlugin,
    DefinePlugin,
    type WebpackPluginInstance,
} from "webpack";

import {isBuildLibrary, isDevelopment, isProduction} from "../config";

const filePathPrefix = isProduction ? "./../" : "./";

const date = new Date();

const definePluginParameters: Record<string, string> = {
    // BUILD_DATE: JSON.stringify(date.getTime()),

    BUILD_DATE_H: JSON.stringify(date.toISOString()),
    // NODE_ENV: JSON.stringify(NODE_ENV),
    IS_PRODUCTION: JSON.stringify(isProduction),
    /*
     * PROJECT_ID: JSON.stringify('my-best-project')
     * IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT)
     */
};

type StaticFilesDataType = Record<"from" | "to", string>;

const staticFilesSiteList: Array<StaticFilesDataType> = [
    "favicon.ico",
    "robots.txt",
    "ads.txt",
    "gss-0.9.xsl",
    "manifest.json",
    // 'index-500.html',
].map<StaticFilesDataType>((fileName: string): StaticFilesDataType => {
    return {
        from: `./www/${fileName}`,
        to: `${filePathPrefix}${fileName}`,
    };
});

const duplicateCheckerPluginInstance: WebpackPluginInstance = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    apply: (compiler: Compiler): void => {
        // eslint-disable-next-line no-undefined
        return undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    ...new DuplicatePackageCheckerPlugin(),
};

const pluginList: Configuration["plugins"] = [
    new CircularDependencyPlugin({exclude: /node_modules/u}),
    duplicateCheckerPluginInstance,
    new CleanWebpackPlugin(),
    new DefinePlugin(definePluginParameters),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: "defer"}),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output, both options are optional
        chunkFilename: isDevelopment ? "[id].css" : "[id].[fullhash:6].css",
        filename: isDevelopment ? "[name].css" : "style.css",
    }),
    new HtmlWebpackPlugin({
        filename: `${filePathPrefix}index.html`,
        hash: true,
        minify: {
            collapseWhitespace: isProduction,
            keepClosingSlash: true,
            minifyCSS: isProduction,
            minifyJS: isProduction,
            removeComments: isProduction,
        },
        template: "./www/index.html",
    }),
    new CopyWebpackPlugin({
        patterns: staticFilesSiteList,
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/u, /en|ru/u),
];

const pluginBuildLibraryList: Configuration["plugins"] = [
    new CircularDependencyPlugin({exclude: /node_modules/u}),
    duplicateCheckerPluginInstance,
    new CleanWebpackPlugin(),
    new DefinePlugin(definePluginParameters),
    // ignored new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output, both options are optional
        chunkFilename: isDevelopment ? "[id].css" : "[id].[fullhash:6].css",
        filename: isDevelopment ? "[name].css" : "style.css",
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/u, /en|ru/u),
];

export const plugins = isBuildLibrary ? pluginBuildLibraryList : pluginList;
