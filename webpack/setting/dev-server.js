const path = require('path');

const {cwd, pathToDist, isBuildServer, webpackDevServerPort} = require('./../config');

const host = 'localhost';
// const host = '192.168.147.45';

const mainProxyUrlSetting = {
    // pathRewrite: {'^/*': ''},
    secure: false,
    target: 'https://api.rocketdata.io/',
    changeOrigin: true, // for this option only: see documentations here https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options
};

module.exports.devServer = {
    host,
    port: webpackDevServerPort,
    contentBase: path.join(cwd, pathToDist),
    historyApiFallback: {
        disableDotRule: true,
    },
    writeToDisk: isBuildServer,
    // inline: false,
    // hot: true,
    // hotOnly: false,
    disableHostCheck: true,
    proxy: {
        '/reports/': mainProxyUrlSetting,
    },
};
