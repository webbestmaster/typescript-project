const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const {isDevelopment, fileRegExp} = require('./../config');

module.exports.optimization = isDevelopment
    ? {
          runtimeChunk: true,
          splitChunks: {
              cacheGroups: {
                  main: {
                      chunks: 'initial',
                      name: 'main',
                      priority: -30,
                      reuseExistingChunk: true,
                  },

                  assets: {
                      chunks: 'initial',
                      name: 'assets',
                      priority: -25,
                      test: /www\/assets/,
                  },
                  util: {
                      chunks: 'initial',
                      name: 'util',
                      priority: -24,
                      test: /www\/util/,
                  },
                  layout: {
                      chunks: 'initial',
                      name: 'layout',
                      priority: -23,
                      test: /www\/layout/,
                  },
                  provider: {
                      chunks: 'initial',
                      name: 'provider',
                      priority: -22,
                      test: /www\/provider/,
                  },
                  service: {
                      chunks: 'initial',
                      name: 'service',
                      priority: -21,
                      test: /www\/service/,
                  },

                  style: {
                      chunks: 'initial',
                      name: 'style',
                      priority: -20,
                      reuseExistingChunk: true,
                      test: /\.s?css$/,
                  },
                  asset: {
                      chunks: 'initial',
                      name: 'asset',
                      priority: -15,
                      test: fileRegExp,
                  },
                  vendor: {
                      chunks: 'initial',
                      name: 'vendor',
                      priority: -10,
                      test: /node_modules/,
                  },
              },
          },
      }
    : {
          minimize: true,
          minimizer: [
              new TerserPlugin({
                  terserOptions: {
                      output: {
                          comments: false,
                          beautify: false,
                      },
                      compress: {
                          pure_funcs: ['console.log'], // eslint-disable-line camelcase, id-match
                          passes: 3,
                      },
                  },
              }),
              new OptimizeCSSAssetsPlugin({}),
          ],
      };
