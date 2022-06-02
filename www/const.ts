/* global BUILD_DATE_H, IS_PRODUCTION */
/* eslint-disable id-match */

export const selector = {
    appWrapper: '.js-app-wrapper',
};

export const demoUrl = 'http://webbestmaster.github.io/react-audio-player-pro';

export const googleAnalyticsId = 'UA-156987706-1';
export const siteDomain = 'my-best-site.com';
export const httpsSiteDomain = `https://${siteDomain}`;
export const openGraphLocaleName = 'en_US';
export const copyrightName = 'My Best Site Dot Com';
export const companyLogoPngFileName = 'company-logo.png';
export const appIconPngFileName = 'app-icon.png';

function sayHi() {
    const {log} = console;

    // http://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=Empty
    // Font: ANSI Shadow
    const hiString = `


    ███████╗███╗   ███╗██████╗ ████████╗██╗   ██╗
    ██╔════╝████╗ ████║██╔══██╗╚══██╔══╝╚██╗ ██╔╝
    █████╗  ██╔████╔██║██████╔╝   ██║    ╚████╔╝
    ██╔══╝  ██║╚██╔╝██║██╔═══╝    ██║     ╚██╔╝
    ███████╗██║ ╚═╝ ██║██║        ██║      ██║
    ╚══════╝╚═╝     ╚═╝╚═╝        ╚═╝      ╚═╝


`;

    log(hiString);

    log('Build date:', BUILD_DATE_H);
    log('Is production:', IS_PRODUCTION);

    log('===================\n');
}

sayHi();
