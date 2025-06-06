/* eslint-disable sonarjs/todo-tag */
import type {WebpackOptionsNormalized} from "webpack";

import {webpackDevServerPort} from "../config";

const serverPort = 3011;
// Const host = "localhost";
const host = "0.0.0.0";

/*
const mainProxyUrlSetting = {
    // pathRewrite: {'^/!*': ''},
    secure: false,
    target: 'https://api.site.io/',
    changeOrigin: true, // for this option only: see documentations here https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options
};
*/

export const devServer: WebpackOptionsNormalized["devServer"] = {
    historyApiFallback: {
        disableDotRule: true,
    },
    host,
    // contentBase: pathToDist,
    hot: true,
    // writeToDisk: isBack,
    // inline: false,
    port: webpackDevServerPort,
    proxy: [
        {
            // TODO: need watch nginx
            context: ["/api-image/"],
            target: `http://127.0.0.1:${serverPort}/`,
        },
        {
            context: ["/api/"],
            target: `http://127.0.0.1:${serverPort}/`,
        },
        {
            // TODO: need watch nginx
            context: ["/static-file/"],
            target: `http://127.0.0.1:${serverPort}/`,
        },
    ],

    /*
    server: isDevelopment
        ? {
              // Import fileSystem from "node:fs";
              options: {
                  // eslint-disable-next-line id-length
                  ca: fileSystem.readFileSync("ssl/rootCA.pem"),
                  cert: fileSystem.readFileSync("ssl/localhost+1.pem"),
                  key: fileSystem.readFileSync("ssl/localhost+1-key.pem"),
              },
              type: "https",
          }
        : {},
    */

    // hotOnly: false,
    // disableHostCheck: true,
    // proxy: {
    //     '/reports/': mainProxyUrlSetting,
    // },
    /*
    proxy: {
        '/op/api': {
            secure: false,
            target: 'https://my-best-web-site-ever.io',
            changeOrigin: true,
            cookieDomainRewrite: 'localhost',
            onProxyRes: proxyResponse => {
                if (proxyResponse.headers['set-cookie']) {
                    // Safari doesn't pass secure cookies from localhost origin
                    proxyResponse.headers['set-cookie'] = proxyResponse.headers['set-cookie'].map(cookie =>
                        cookie.replace(/; secure/gi, '')
                    );
                    // Safari doesn't pass SameSite=None cookies from localhost origin
                    proxyResponse.headers['set-cookie'] = proxyResponse.headers['set-cookie'].map(cookie =>
                        cookie.replace(/; SameSite=None/gi, '; SameSite=Strict')
                    );
                }
            },
        },
    },
*/
};
