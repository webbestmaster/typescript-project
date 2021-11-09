'use strict';
exports.id = 672;
exports.ids = [672];
exports.modules = {
    /***/ 972: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ 'default': () => /* binding */ Info,
            /* harmony export */
        });
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
        /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
        /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
            react__WEBPACK_IMPORTED_MODULE_1__
        );
        /* harmony import */ var react_system_hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(882);
        /* harmony import */ var react_system_hook__WEBPACK_IMPORTED_MODULE_2___default =
            /*#__PURE__*/ __webpack_require__.n(react_system_hook__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */ var _provider_locale_locale_context__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(935);
        /* harmony import */ var _layout_error_data_error_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(253);
        /* harmony import */ var _home_image_marker_icon_2x_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(436);
        /* harmony import */ var _home_image_questions_with_an_official_answer_svg__WEBPACK_IMPORTED_MODULE_6__ =
            __webpack_require__(103);
        /* harmony import */ var _home_home_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(695);

        /* global setTimeout */

        // import {NavigationLink} from 'react-router-dom-hook';

        // import {appRoute} from '../../component/app/app-route';

        console.log(_layout_error_data_error_data__WEBPACK_IMPORTED_MODULE_4__ /* .ErrorData */.K);
        /*
const LoadMeAsyncLazy = lazy(
    () =>
        import(
            /!* webpackChunkName: 'load-me-async-lazy' *!/
            '../../component/load-me-async-lazy/load-me-async-lazy'
        )
);
*/
        // eslint-disable-next-line import/no-default-export
        function Info() {
            const {getLocalizedString} = (0,
            _provider_locale_locale_context__WEBPACK_IMPORTED_MODULE_3__ /* .useLocale */.bU)();
            const [isOpen, setIsOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
            const {
                screenInfo,
                // isBrowser, // true if running in browser, false for SSR
            } = (0, react_system_hook__WEBPACK_IMPORTED_MODULE_2__.useSystem)();
            /*
    const {
        devicePixelRatio, // number, default: 2, usually is 2 for smartphones
        isLandscape, // true if width > height
        isMobile, // screen width < 768
        isPortrait, // opposite for isLandscape
        name, // ScreenWidthNameEnum, relative from screen width: 'desktop', 'mobile' or 'tablet'
        isTablet, // screen width < 980 and >= 768
        isDesktop, // screen width >= 980
    } = screenInfo;
*/
            const {
                height, // number, default: 768
                width, // number, default: 980
            } = (0, react_system_hook__WEBPACK_IMPORTED_MODULE_2__.useScreenSize)();
            const screenWidth = (0, react_system_hook__WEBPACK_IMPORTED_MODULE_2__.useScreenWidth)(); // number, default: 980
            const screenHeight = (0, react_system_hook__WEBPACK_IMPORTED_MODULE_2__.useScreenHeight)(); // number, default: 768
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
                console.log('info');
            });
            setTimeout(() => {
                console.log(isOpen);
                setIsOpen(false);
            }, 1e3);
            console.log('evaluate info');
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                'div',
                {
                    children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'h1',
                            Object.assign(
                                {
                                    className:
                                        _home_home_scss__WEBPACK_IMPORTED_MODULE_7__ /* ["default"].home_header */.Z
                                            .home_header,
                                },
                                {children: 'info page'}
                            ),
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'pre',
                            {children: JSON.stringify(screenInfo, null, 4)},
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'pre',
                            {children: JSON.stringify({height, screenHeight, screenWidth, width}, null, 4)},
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _provider_locale_locale_context__WEBPACK_IMPORTED_MODULE_3__ /* .Locale */.go,
                            {stringKey: 'BUTTON__APPLY'},
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'h4',
                            {children: getLocalizedString('BUTTON__APPLY')},
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'img',
                            {alt: '', src: _home_image_marker_icon_2x_png__WEBPACK_IMPORTED_MODULE_5__},
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'img',
                            {
                                alt: '',
                                src: _home_image_questions_with_an_official_answer_svg__WEBPACK_IMPORTED_MODULE_6__ /* ["default"] */.Z,
                            },
                            void 0
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _home_image_questions_with_an_official_answer_svg__WEBPACK_IMPORTED_MODULE_6__ /* .ReactComponent */.r,
                            {},
                            void 0
                        ),
                    ],
                },
                void 0
            );
        }

        /***/
    },
};
//# sourceMappingURL=page-info.03455c.chunk.js.map
