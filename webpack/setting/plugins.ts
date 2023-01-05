import {Configuration, ContextReplacementPlugin, DefinePlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import {isProduction, isDevelopment, isBuildLibrary} from '../config';

const filePathPrefix = isProduction ? './../' : './';

const date = new Date();

const definePluginParameters: Record<string, string> = {
    // eslint-disable-next-line id-match
    // BUILD_DATE: JSON.stringify(date.getTime()),
    // eslint-disable-next-line id-match
    BUILD_DATE_H: JSON.stringify(date.toISOString()),
    // NODE_ENV: JSON.stringify(NODE_ENV),
    IS_PRODUCTION: JSON.stringify(isProduction),
    // PROJECT_ID: JSON.stringify('my-best-project')
    // IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT)
};

const staticFilesSiteList: Array<Record<'from' | 'to', string>> = [
    'favicon.ico',
    'robots.txt',
    'ads.txt',
    'gss-0.9.xsl',
    'manifest.json',
    // 'index-500.html',
].map<Record<'from' | 'to', string>>(
    (fileName: string): Record<'from' | 'to', string> => ({
        from: `./www/${fileName}`,
        to: `${filePathPrefix}${fileName}`,
    })
);

const pluginList: Configuration['plugins'] = [
    new CircularDependencyPlugin({exclude: /node_modules/}),
    new DuplicatePackageCheckerPlugin(),
    new CleanWebpackPlugin(),
    new DefinePlugin(definePluginParameters),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isDevelopment ? '[name].css' : 'style.css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash:6].css',
    }),
    new HtmlWebpackPlugin({
        minify: {
            collapseWhitespace: isProduction,
            removeComments: isProduction,
            minifyCSS: isProduction,
            minifyJS: isProduction,
            keepClosingSlash: true,
        },
        hash: true,
        filename: filePathPrefix + 'index.html',
        template: './www/index.html',
    }),
    new CopyWebpackPlugin({
        patterns: staticFilesSiteList,
    }),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru/),
];

const pluginBuildLibraryList: Configuration['plugins'] = [
    new CircularDependencyPlugin({exclude: /node_modules/}),
    new DuplicatePackageCheckerPlugin(),
    new CleanWebpackPlugin(),
    new DefinePlugin(definePluginParameters),
    // new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isDevelopment ? '[name].css' : 'style.css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash:6].css',
    }),
    /*
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: isProduction,
                removeComments: isProduction,
                minifyCSS: isProduction,
                minifyJS: isProduction,
                keepClosingSlash: true,
            },
            hash: true,
            filename: filePathPrefix + 'index.html',
            template: './www/index.html',
        }),
    */
    /*
        new CopyWebpackPlugin({
            patterns: staticFilesSiteList,
        }),
    */
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru/),
];

export const plugins = isBuildLibrary ? pluginBuildLibraryList : pluginList;
