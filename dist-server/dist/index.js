/******/ (() => {
    // webpackBootstrap
    /******/ 'use strict';
    /******/ var __webpack_modules__ = {
        /***/ 103: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */ 'Z': () => __WEBPACK_DEFAULT_EXPORT__,
                /* harmony export */ 'r': () => /* binding */ SvgQuestionsWithAnOfficialAnswer,
                /* harmony export */
            });
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                react__WEBPACK_IMPORTED_MODULE_0__
            );
            var _path;

            function _extends() {
                _extends =
                    Object.assign ||
                    function (target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            for (var key in source) {
                                if (Object.prototype.hasOwnProperty.call(source, key)) {
                                    target[key] = source[key];
                                }
                            }
                        }
                        return target;
                    };
                return _extends.apply(this, arguments);
            }

            function SvgQuestionsWithAnOfficialAnswer(props) {
                return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
                    'svg',
                    _extends(
                        {
                            width: 32,
                            height: 32,
                            fill: 'currentColor',
                            xmlns: 'http://www.w3.org/2000/svg',
                        },
                        props
                    ),
                    _path ||
                        (_path = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement('path', {
                            d: 'M16 .5C7.437.5.5 7.438.5 16c0 8.563 6.938 15.5 15.5 15.5 8.563 0 15.5-6.938 15.5-15.5C31.5 7.437 24.562.5 16 .5zm0 28C9.106 28.5 3.5 22.894 3.5 16S9.106 3.5 16 3.5 28.5 9.106 28.5 16 22.894 28.5 16 28.5zM11 15c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2-1.106 0-2 .894-2 2 0 1.106.894 2 2 2zm10 0c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2-1.106 0-2 .894-2 2 0 1.106.894 2 2 2zm.25 4.538A6.82 6.82 0 0116 22a6.8 6.8 0 01-5.25-2.462 1.504 1.504 0 00-2.113-.194 1.504 1.504 0 00-.193 2.112A9.81 9.81 0 0016 24.994a9.81 9.81 0 007.556-3.538 1.498 1.498 0 00-.194-2.112 1.504 1.504 0 00-2.112.194z',
                        }))
                );
            }

            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__.p + 'e2f0c34.svg';

            /***/
        },

        /***/ 695: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */ 'Z': () => __WEBPACK_DEFAULT_EXPORT__,
                /* harmony export */
            });
            // extracted by mini-css-extract-plugin
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = {'home_header': 'e4e05a'};

            /***/
        },

        /***/ 57: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */ '$': () => /* binding */ appRoute,
                /* harmony export */
            });
            /* eslint-disable sort-keys */
            const appRoute = {
                root: {
                    path: '/',
                },
                info: {
                    path: '/info',
                },
            };

            /***/
        },

        /***/ 253: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            // EXPORTS
            __webpack_require__.d(__webpack_exports__, {
                'K': () => /* binding */ ErrorData,
            });

            // EXTERNAL MODULE: external "react/jsx-runtime"
            var jsx_runtime_ = __webpack_require__(997);
            // EXTERNAL MODULE: ./www/util/css.ts
            var css = __webpack_require__(643);
            // EXTERNAL MODULE: ./www/provider/locale/locale-context.ts + 7 modules
            var locale_context = __webpack_require__(935); // CONCATENATED MODULE: ./www/layout/error-data/error-data.scss
            // extracted by mini-css-extract-plugin
            /* harmony default export */ const error_data = {'error_data': 'f9913c', 'error_data__text': 'a52e89'}; // CONCATENATED MODULE: ./www/layout/error-data/error-data.tsx
            function ErrorData(props) {
                const {langKey, className} = props;
                return (0, jsx_runtime_.jsx)(
                    'div',
                    Object.assign(
                        {className: (0, css /* classNames */.A)(error_data.error_data, className)},
                        {
                            children: (0, jsx_runtime_.jsx)(
                                'p',
                                Object.assign(
                                    {className: error_data.error_data__text},
                                    {
                                        children: (0, jsx_runtime_.jsx)(
                                            locale_context /* Locale */.go,
                                            {stringKey: langKey},
                                            void 0
                                        ),
                                    }
                                ),
                                void 0
                            ),
                        }
                    ),
                    void 0
                );
            }

            /***/
        },

        /***/ 598: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */ 'S': () => /* binding */ LocaleNameEnum,
                /* harmony export */
            });
            var LocaleNameEnum;
            (function (LocaleNameEnum) {
                LocaleNameEnum['enUs'] = 'en-US';
                LocaleNameEnum['ruRu'] = 'ru-RU';
                LocaleNameEnum['zhCn'] = 'zh-CN';
                LocaleNameEnum['zhTw'] = 'zh-TW';
            })(LocaleNameEnum || (LocaleNameEnum = {}));

            /***/
        },

        /***/ 935: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            // EXPORTS
            __webpack_require__.d(__webpack_exports__, {
                'go': () => /* binding */ Locale,
                '_C': () => /* binding */ LocalizationProvider,
                'bU': () => /* binding */ useLocale,
            }); // CONCATENATED MODULE: external "react-localization-library"

            const external_react_localization_library_namespaceObject = require('react-localization-library'); // CONCATENATED MODULE: ./www/provider/locale/translation/en-us/data.ts
            const enUs = {
                /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string, sort-keys */
                META__LANGUAGE_NAME: 'English',
                BUTTON__YES: 'Yes',
                BUTTON__NO: 'No',
                BUTTON__CANCEL: 'Cancel',
                BUTTON__CLOSE: 'Close',
                BUTTON__SEND: 'Send',
                BUTTON__OK: 'OK',
                BUTTON__APPLY: 'Apply',
                BUTTON__CONFIRM: 'Confirm',
                BUTTON__DECLINE: 'Decline',
                BUTTON__UPLOAD: 'Upload',
                BUTTON__DOWNLOAD: 'Download',
                BUTTON__SELECT: 'Select',
                BUTTON__SELECT_A_FILE: 'Select a file',
                BUTTON__PREVIOUS_STEP: 'Previous step',
                BUTTON__NEXT_STEP: 'Next step',
                BUTTON__ADD: 'Add',
                BUTTON__CREATE: 'Create',
                BUTTON__UPLOAD_IMAGE: 'Upload image',
                BUTTON__UPDATE: 'Update',
                BUTTON__UPDATE_INFO: 'Update info',
                BUTTON__SAVE_INFORMATION: 'Save information',
                BUTTON__COMPLETE_CREATION: 'Complete creation',
                BUTTON__CHANGE_PASSWORD: 'Change password',
                BUTTON__SAVE: 'Save',
                BUTTON__SAVE_SETTINGS: 'Save settings',
                BUTTON__DELETE: 'Delete',
                BUTTON__DELETE_SELECTED: 'Delete selected',
                BUTTON__ACTIONS: 'Actions',
                BUTTON__MOVE_SELECTED: 'Move selected',
                BUTTON__RESET_CHANGES: 'Reset changes',
                BUTTON__SIGN_IN: 'Sign in',
                BUTTON__SIGN_OUT: 'Sign out',
                BUTTON__LOG_IN: 'Log in',
                BUTTON__LOG_OUT: 'Log out',
                WEEK_DAY__MONDAY: 'Monday',
                WEEK_DAY__TUESDAY: 'Tuesday',
                WEEK_DAY__WEDNESDAY: 'Wednesday',
                WEEK_DAY__THURSDAY: 'Thursday',
                WEEK_DAY__FRIDAY: 'Friday',
                WEEK_DAY__SATURDAY: 'Saturday',
                WEEK_DAY__SUNDAY: 'Sunday',
                WEEK_DAY__ALL_DAYS: 'All days',
                EMPTY__THERE_IS_NOTHING_HERE_YET: 'There is nothing here yet.',
                EMPTY__THERES_NOTHING_HERE: "There's nothing here.",
                EMPTY__TRY_CHANGING_FILTERS: 'Try changing filters.',
                EMPTY__EMPTY: 'Empty.',
                ERROR__CAN_NOT_LOAD_THE_COMPONENT: 'Can not load the component.',
                /* eslint-enable id-match, id-length, max-len,sonarjs/no-duplicate-string, sort-keys */
            }; // CONCATENATED MODULE: ./www/provider/locale/translation/ru-ru/data.ts
            /*
const keyList: Array<string> = [];
const valueList: Array<string> = [];

Object.entries(enUs).forEach((data: [string, string]) => {
    const [key, value] = data;

    keyList.push(key);
    valueList.push(value);
});

console.log('---- i18n keys ----');
console.log(keyList.join('\n'));
console.log('---- i18n values ----');
console.log(valueList.join('\n'));
*/

            const ruRu = {
                /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string, sort-keys */
                META__LANGUAGE_NAME: 'Русский',
                BUTTON__YES: 'Да',
                BUTTON__NO: 'Нет',
                BUTTON__CANCEL: 'Отмена',
                BUTTON__CLOSE: 'Закрыть',
                BUTTON__SEND: 'Отправить',
                BUTTON__OK: 'OK',
                BUTTON__APPLY: 'Применить',
                BUTTON__CONFIRM: 'Подтвердить',
                BUTTON__DECLINE: 'Отклонить',
                BUTTON__UPLOAD: 'Загрузить',
                BUTTON__DOWNLOAD: 'Скачать',
                BUTTON__SELECT: 'Выбрать',
                BUTTON__SELECT_A_FILE: 'Выбрать файл',
                BUTTON__PREVIOUS_STEP: 'Предыдущий шаг',
                BUTTON__NEXT_STEP: 'Следующий шаг',
                BUTTON__ADD: 'Добавить',
                BUTTON__CREATE: 'Создать',
                BUTTON__UPLOAD_IMAGE: 'Загрузить изображение',
                BUTTON__UPDATE: 'Обновить',
                BUTTON__UPDATE_INFO: 'Обновить информацию',
                BUTTON__SAVE_INFORMATION: 'Сохранить информацию',
                BUTTON__COMPLETE_CREATION: 'Завершить создание',
                BUTTON__CHANGE_PASSWORD: 'Сменить пароль',
                BUTTON__SAVE: 'Сохранить',
                BUTTON__SAVE_SETTINGS: 'Сохранить настройки',
                BUTTON__DELETE: 'Удалить',
                BUTTON__DELETE_SELECTED: 'Удалить выбранные',
                BUTTON__ACTIONS: 'Действия',
                BUTTON__MOVE_SELECTED: 'Переместить выбранные',
                BUTTON__RESET_CHANGES: 'Отменить изменения',
                BUTTON__SIGN_IN: 'Войти',
                BUTTON__SIGN_OUT: 'Выйти',
                BUTTON__LOG_IN: 'Войти',
                BUTTON__LOG_OUT: 'Выйти',
                WEEK_DAY__MONDAY: 'Понедельник',
                WEEK_DAY__TUESDAY: 'Вторник',
                WEEK_DAY__WEDNESDAY: 'Среда',
                WEEK_DAY__THURSDAY: 'Четверг',
                WEEK_DAY__FRIDAY: 'Пятница',
                WEEK_DAY__SATURDAY: 'Суббота',
                WEEK_DAY__SUNDAY: 'Воскресенье',
                WEEK_DAY__ALL_DAYS: 'Все дни',
                EMPTY__THERE_IS_NOTHING_HERE_YET: 'Здесь пока ничего нет.',
                EMPTY__THERES_NOTHING_HERE: 'Здесь ничего нет.',
                EMPTY__TRY_CHANGING_FILTERS: 'Попробуйте изменить фильтры.',
                EMPTY__EMPTY: 'Пусто.',
                ERROR__CAN_NOT_LOAD_THE_COMPONENT: 'Не получилось загрузить компонент.',
                /* eslint-enable id-match, id-length, max-len,sonarjs/no-duplicate-string, sort-keys */
            }; // CONCATENATED MODULE: ./www/provider/locale/translation/zh-cn/data.ts
            /*
const keyList: Array<string> = [];
const valueList: Array<string> = [];

Object.entries(ruRu).forEach((data: [string, string]) => {
    const [key, value] = data;

    keyList.push(key);
    valueList.push(value);
});

console.log('---- i18n keys ----');
console.log(keyList.join('\n'));
console.log('---- i18n values ----');
console.log(valueList.join('\n'));
*/

            const zhCn = {
                ...enUs,
                /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string, sort-keys */
                META__LANGUAGE_NAME: '简体中文',
                /* eslint-enable id-match, id-length, max-len,sonarjs/no-duplicate-string, sort-keys */
            }; // CONCATENATED MODULE: ./www/provider/locale/translation/zh-tw/data.ts

            const zhTw = {
                ...enUs,
                /* eslint-disable id-match, id-length, max-len, sonarjs/no-duplicate-string, sort-keys */
                META__LANGUAGE_NAME: '繁體中文',
                /* eslint-enable id-match, id-length, max-len,sonarjs/no-duplicate-string, sort-keys */
            };

            // EXTERNAL MODULE: ./www/provider/locale/locale-context-type.ts
            var locale_context_type = __webpack_require__(598); // CONCATENATED MODULE: ./www/provider/locale/locale-context-const.ts
            const allLocalesData = {
                [locale_context_type /* LocaleNameEnum.enUs */.S.enUs]: enUs,
                [locale_context_type /* LocaleNameEnum.ruRu */.S.ruRu]: ruRu,
                [locale_context_type /* LocaleNameEnum.zhCn */.S.zhCn]: zhCn,
                [locale_context_type /* LocaleNameEnum.zhTw */.S.zhTw]: zhTw,
            };
            const localeConst = {
                defaults: {
                    localeName: locale_context_type /* LocaleNameEnum.enUs */.S.enUs,
                },
                key: {
                    localStorage: {
                        localeName: 'my-locale-name-v.1.0', // PROJECT_ID + 'my-locale-name-v.1.0'
                    },
                },
            }; // CONCATENATED MODULE: ./www/provider/locale/locale-context-helper.ts

            /* global localStorage, navigator */
            // import {getEnumValueEnsure} from '../../util/enum';

            // import {LocaleNameEnum, ShortLocaleNameEnum} from './locale-context-type';
            // eslint-disable-next-line complexity
            function getSavedLocaleName(localeNameList) {
                const [defaultLocaleName] = localeNameList;
                if (typeof localStorage === 'undefined' || typeof navigator === 'undefined') {
                    return defaultLocaleName;
                }
                const savedLocaleName = localStorage.getItem(localeConst.key.localStorage.localeName);
                // eslint-disable-next-line no-loops/no-loops
                for (const localeNameInList of localeNameList) {
                    if (localeNameInList === savedLocaleName) {
                        return localeNameInList;
                    }
                }
                const navigatorLanguages = navigator.languages;
                // eslint-disable-next-line no-loops/no-loops
                for (const deviceLocaleName of navigatorLanguages) {
                    // eslint-disable-next-line no-loops/no-loops
                    for (const localeNameInList of localeNameList) {
                        if (deviceLocaleName === localeNameInList) {
                            return localeNameInList;
                        }
                    }
                }
                return defaultLocaleName;
            }
            function saveLocaleName(localeName) {
                console.log('---> save localeName localStorage:', localeConst.key.localStorage.localeName, localeName);
                localStorage.setItem(localeConst.key.localStorage.localeName, localeName);
                return localeName;
            } // CONCATENATED MODULE: ./www/provider/locale/locale-context.ts
            /*
export function getShortLocaleName(localeName: LocaleNameEnum): ShortLocaleNameEnum {
    const [mayBeShortLocaleName] = localeName.split('-');

    return getEnumValueEnsure<ShortLocaleNameEnum>(
        ShortLocaleNameEnum,
        mayBeShortLocaleName,
        localeConst.defaults.shortLocaleName
    );
}
*/

            const localizationConfig = {
                defaultLocaleName: getSavedLocaleName(Object.values(locale_context_type /* LocaleNameEnum */.S)),
                localization: allLocalesData,
                onUseEffect: localizationProviderState => {
                    const {localeName} = localizationProviderState;
                    saveLocaleName(localeName);
                },
            };
            const {LocalizationProvider, Locale, useLocale} = (0,
            external_react_localization_library_namespaceObject.createLocalization)(localizationConfig);

            /***/
        },

        /***/ 643: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */ 'A': () => /* binding */ classNames,
                /* harmony export */
            });
            // eslint-disable-next-line complexity
            function classNames(...argumentList) {
                const classNameList = [];
                // eslint-disable-next-line no-loops/no-loops
                for (const classNameData of argumentList) {
                    if (!classNameData) {
                        // eslint-disable-next-line no-continue
                        continue;
                    }
                    if (typeof classNameData === 'string') {
                        classNameList.push(classNameData);
                        // eslint-disable-next-line no-continue
                        continue;
                    }
                    // eslint-disable-next-line no-loops/no-loops
                    for (const key in classNameData) {
                        if (classNameData[key]) {
                            classNameList.push(key);
                        }
                    }
                }
                return classNameList.join(' ');
            }

            /***/
        },

        /***/ 436: /***/ (module, __unused_webpack_exports, __webpack_require__) => {
            module.exports = __webpack_require__.p + 'build-asset/680f69.png';

            /***/
        },

        /***/ 689: /***/ module => {
            module.exports = require('react');

            /***/
        },

        /***/ 59: /***/ module => {
            module.exports = require('react-router-dom-hook');

            /***/
        },

        /***/ 882: /***/ module => {
            module.exports = require('react-system-hook');

            /***/
        },

        /***/ 997: /***/ module => {
            module.exports = require('react/jsx-runtime');

            /***/
        },

        /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
    }
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = __webpack_modules__;
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/compat get default export */
    /******/ (() => {
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = module => {
            /******/ var getter =
                module && module.__esModule ? /******/ () => module['default'] : /******/ () => module;
            /******/ __webpack_require__.d(getter, {a: getter});
            /******/ return getter;
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/ensure chunk */
    /******/ (() => {
        /******/ __webpack_require__.f = {};
        /******/ // This file contains only the entry chunk.
        /******/ // The chunk loading function for additional chunks
        /******/ __webpack_require__.e = chunkId => {
            /******/ return Promise.all(
                Object.keys(__webpack_require__.f).reduce((promises, key) => {
                    /******/ __webpack_require__.f[key](chunkId, promises);
                    /******/ return promises;
                    /******/
                }, [])
            );
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/get javascript chunk filename */
    /******/ (() => {
        /******/ // This function allow to reference async chunks
        /******/ __webpack_require__.u = chunkId => {
            /******/ // return url for filenames based on template
            /******/ return (
                '' +
                {'443': 'load-me-async', '672': 'page-info'}[chunkId] +
                '.' +
                __webpack_require__.h().slice(0, 6) +
                '.chunk.js'
            );
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/get mini-css chunk filename */
    /******/ (() => {
        /******/ // This function allow to reference all chunks
        /******/ __webpack_require__.miniCssF = chunkId => {
            /******/ // return url for filenames based on template
            /******/ return 'style.css';
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/getFullHash */
    /******/ (() => {
        /******/ __webpack_require__.h = () => '3c3146e03779d1ae3557';
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
        /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = exports => {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
                /******/
            }
            /******/ Object.defineProperty(exports, '__esModule', {value: true});
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/publicPath */
    /******/ (() => {
        /******/ __webpack_require__.p = '/static/';
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/require chunk loading */
    /******/ (() => {
        /******/ // no baseURI
        /******/
        /******/ // object to store loaded chunks
        /******/ // "1" means "loaded", otherwise not loaded yet
        /******/ var installedChunks = {
            /******/ 179: 1,
            /******/
        };
        /******/
        /******/ // no on chunks loaded
        /******/
        /******/ var installChunk = chunk => {
            /******/ var moreModules = chunk.modules,
                chunkIds = chunk.ids,
                runtime = chunk.runtime;
            /******/ for (var moduleId in moreModules) {
                /******/ if (__webpack_require__.o(moreModules, moduleId)) {
                    /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
                    /******/
                }
                /******/
            }
            /******/ if (runtime) runtime(__webpack_require__);
            /******/ for (var i = 0; i < chunkIds.length; i++) /******/ installedChunks[chunkIds[i]] = 1;
            /******/
            /******/
        };
        /******/
        /******/ // require() chunk loading for javascript
        /******/ __webpack_require__.f.require = (chunkId, promises) => {
            /******/ // "1" is the signal for "already loaded"
            /******/ if (!installedChunks[chunkId]) {
                /******/ if (true) {
                    // all chunks have JS
                    /******/ installChunk(require('./' + __webpack_require__.u(chunkId)));
                    /******/
                } else installedChunks[chunkId] = 1;
                /******/
            }
            /******/
        };
        /******/
        /******/ // no external install chunk
        /******/
        /******/ // no HMR
        /******/
        /******/ // no HMR manifest
        /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        // EXTERNAL MODULE: external "react/jsx-runtime"
        var jsx_runtime_ = __webpack_require__(997);
        // EXTERNAL MODULE: external "react"
        var external_react_ = __webpack_require__(689); // CONCATENATED MODULE: external "react-dom/server"
        const server_namespaceObject = require('react-dom/server');
        var server_default = /*#__PURE__*/ __webpack_require__.n(server_namespaceObject);
        // EXTERNAL MODULE: ./www/provider/locale/locale-context.ts + 7 modules
        var locale_context = __webpack_require__(935); // CONCATENATED MODULE: ./www/component/app/app-provider.tsx
        function AppProvider(props) {
            const {children} = props;
            return (0, jsx_runtime_.jsx)(
                external_react_.StrictMode,
                {
                    children: (0, jsx_runtime_.jsx)(
                        locale_context /* LocalizationProvider */._C,
                        {children: children},
                        void 0
                    ),
                },
                void 0
            );
        } // CONCATENATED MODULE: external "react-router-dom"

        const external_react_router_dom_namespaceObject = require('react-router-dom');
        // EXTERNAL MODULE: external "react-system-hook"
        var external_react_system_hook_ = __webpack_require__(882);
        // EXTERNAL MODULE: external "react-router-dom-hook"
        var external_react_router_dom_hook_ = __webpack_require__(59); // CONCATENATED MODULE: external "markdown-pro"
        const external_markdown_pro_namespaceObject = require('markdown-pro');
        var external_markdown_pro_default = /*#__PURE__*/ __webpack_require__.n(external_markdown_pro_namespaceObject);
        // EXTERNAL MODULE: ./www/util/css.ts
        var css = __webpack_require__(643); // CONCATENATED MODULE: ./www/layout/spinner/spinner.scss
        // extracted by mini-css-extract-plugin
        /* harmony default export */ const spinner = {
            'spinner_image': 'c2a665',
            'loading-spinner': 'a278ac',
            'spinner_wrapper': 'c8fad8',
            'ascii_spinner': 'feccdd',
            'ascii-spinner-animation': 'eef587',
            'show-spinner-animation': 'e11de7',
        }; // CONCATENATED MODULE: ./www/layout/spinner/spinner-const.ts
        const defaultSpinnerSize = 48; // CONCATENATED MODULE: ./www/layout/spinner/spinner-type.ts

        var SpinnerPositionEnum;
        (function (SpinnerPositionEnum) {
            SpinnerPositionEnum['absolute'] = 'absolute';
            SpinnerPositionEnum['fixed'] = 'fixed';
            SpinnerPositionEnum['relative'] = 'relative';
            SpinnerPositionEnum['static'] = 'static';
        })(SpinnerPositionEnum || (SpinnerPositionEnum = {})); // CONCATENATED MODULE: ./www/layout/spinner/spinner.tsx

        function Spinner(props) {
            const {
                size = defaultSpinnerSize,
                lineWidth,
                arcColor,
                circleColor,
                isShow,
                wrapperWidth,
                wrapperHeight,
                position = SpinnerPositionEnum['static'],
                wrapperColor,
                wrapperPadding,
                className,
            } = props;
            if (isShow === false) {
                return null;
            }
            const spinnerImageStyle = {
                borderColor: circleColor,
                borderTopColor: arcColor,
                borderWidth: lineWidth,
                height: size,
                width: size,
            };
            const spinnerWrapperStyle = {
                backgroundColor: wrapperColor,
                height: wrapperHeight,
                minHeight: size,
                minWidth: size,
                padding: wrapperPadding,
                position,
                width: wrapperWidth,
            };
            return (0, jsx_runtime_.jsx)(
                'div',
                Object.assign(
                    {
                        'aria-busy': 'true',
                        className: (0, css /* classNames */.A)(spinner.spinner_wrapper, className),
                        style: spinnerWrapperStyle,
                    },
                    {
                        children: (0, jsx_runtime_.jsx)(
                            'div',
                            {className: spinner.spinner_image, style: spinnerImageStyle},
                            void 0
                        ),
                    }
                ),
                void 0
            );
        }

        // EXTERNAL MODULE: ./www/layout/error-data/error-data.tsx + 1 modules
        var error_data = __webpack_require__(253);
        // EXTERNAL MODULE: ./www/component/app/app-route.ts
        var app_route = __webpack_require__(57);
        // EXTERNAL MODULE: ./www/provider/locale/locale-context-type.ts
        var locale_context_type = __webpack_require__(598); // CONCATENATED MODULE: ./www/util/format.ts
        /* global Intl */
        var TimeSizeEnum;
        (function (TimeSizeEnum) {
            TimeSizeEnum['day'] = 'day';
            TimeSizeEnum['hour'] = 'hour';
            TimeSizeEnum['minute'] = 'minute';
            TimeSizeEnum['month'] = 'month';
            TimeSizeEnum['second'] = 'second';
            TimeSizeEnum['year'] = 'year';
        })(TimeSizeEnum || (TimeSizeEnum = {}));
        function getFormattedNumber(localeName, value, options) {
            const formatter = new Intl.NumberFormat(localeName, options);
            return formatter.format(value);
        }
        function getFormattedDateTime(localeName, date, options) {
            const formatter = new Intl.DateTimeFormat(localeName, options);
            return formatter.format(date);
        } // CONCATENATED MODULE: ./www/hook/format-hook/format-hook.tsx

        function useFormat() {
            const {localeName} = (0, locale_context /* useLocale */.bU)();
            const getFormattedNumberWrapper = (0, external_react_.useCallback)(
                (value, options) => {
                    return getFormattedNumber(localeName, value, options);
                },
                [localeName]
            );
            const getFormattedDateTimeWrapper = (0, external_react_.useCallback)(
                (date, options) => {
                    return getFormattedDateTime(localeName, date, options);
                },
                [localeName]
            );
            return {
                getFormattedDateTime: getFormattedDateTimeWrapper,
                getFormattedNumber: getFormattedNumberWrapper,
            };
        } // CONCATENATED MODULE: ./www/util/auto-test.ts

        /* global IS_PRODUCTION */
        function productionGetTestNodeId() {
            return null;
        }
        function developmentGetTestNodeId(nodeId) {
            return nodeId;
        }
        function productionGetTestNodeData() {
            return null;
        }
        function developmentGetTestNodeData(data) {
            return typeof data === 'string' ? data : JSON.stringify(data);
        }
        const isProduction = Boolean(true && true);
        const getTestNodeId = isProduction ? productionGetTestNodeId : developmentGetTestNodeId;
        const getTestNodeData = isProduction ? productionGetTestNodeData : developmentGetTestNodeData; // CONCATENATED MODULE: ./www/library/library-component/library.scss

        // extracted by mini-css-extract-plugin
        /* harmony default export */ const library = {'test_library': 'e483b3', 'test_library__header': 'f561fb'}; // CONCATENATED MODULE: ./www/library/library-component/library-component.tsx
        function LibraryComponent(props) {
            const {children, textContent} = props;
            return (0, jsx_runtime_.jsxs)(
                'div',
                Object.assign(
                    {className: library.test_library},
                    {
                        children: [
                            (0, jsx_runtime_.jsx)(
                                'h3',
                                Object.assign({className: library.test_library__header}, {children: textContent}),
                                void 0
                            ),
                            (0, jsx_runtime_.jsx)('div', {children: children}, void 0),
                        ],
                    }
                ),
                void 0
            );
        } // CONCATENATED MODULE: ./www/library/library.ts // CONCATENATED MODULE: ./www/layout/spinner/c-ascii-spinner.tsx

        function AsciiSpinner(props) {
            const {isShow = true, className} = props;
            if (!isShow) {
                return null;
            }
            const wrapperClassName = (0, css /* classNames */.A)(spinner.ascii_spinner, className);
            return (0, jsx_runtime_.jsx)('span', {'aria-busy': 'true', className: wrapperClassName}, void 0);
        } // CONCATENATED MODULE: external "react-audio-player-pro"

        const external_react_audio_player_pro_namespaceObject = require('react-audio-player-pro'); // CONCATENATED MODULE: ./www/const.ts
        /* global BUILD_DATE_H, IS_PRODUCTION */
        /* eslint-disable id-match */
        const selector = {
            appWrapper: '.js-app-wrapper',
        };
        const demoUrl = 'http://webbestmaster.github.io/react-audio-player-pro';
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
            log('Build date:', '2021-11-03T10:18:21.739Z');
            log('Is production:', true);
        }
        sayHi(); // CONCATENATED MODULE: ./www/layout/markdown.tsx

        function Markdown(props) {
            const {mdInput, config} = props;
            // eslint-disable-next-line react/no-danger, id-match
            return (0, jsx_runtime_.jsx)(
                'div',
                {
                    className: 'md-pro',
                    dangerouslySetInnerHTML: {
                        __html: (0, external_markdown_pro_namespaceObject.markdown)(mdInput, config),
                    },
                },
                void 0
            );
        } // CONCATENATED MODULE: ./www/component/example-audio/example-audio.md

        /* harmony default export */ const example_audio =
            "### Example &lt;Audio/&gt;\r\n\r\n```javascript\r\nimport React from 'react';\r\nimport {AudioPlayerControlSprite, Audio} from 'react-audio-player-pro';\r\nimport reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';\r\n\r\nconst mediaMetadata = {\r\n\r\n    // required\r\n    title: 'Pure Water',\r\n\r\n    // optional\r\n    artist: 'Meydän',\r\n\r\n    // optional\r\n    album: 'Interplanetary Forest',\r\n\r\n    // optional\r\n    artwork: [\r\n\r\n        // src, sizes and type is required\r\n        {src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png'},\r\n        {src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png'},\r\n    ],\r\n};\r\n\r\nexport function ExampleAudio() {\r\n    return (\r\n        &lt;&gt;\r\n            &lt;AudioPlayerControlSprite/&gt;\r\n            &lt;Audio\r\n                // string - path to audio file, required\r\n                src=\"/path/to/audio/file\"\r\n\r\n                // MediaMetadata - media meta data\r\n                // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata\r\n                // optional\r\n                mediaMetadata={mediaMetadata}\r\n\r\n                // string - wrapper's class name, optional, deafult: ''\r\n                className=\"my-class-name\"\r\n\r\n                // callback function - called on did mount, optional, default: noop\r\n                onDidMount={console.log}\r\n\r\n                // string - name for download file, optional, deafult: &lt;src&gt;\r\n                downloadFileName=\"my-file.mp3\"\r\n\r\n                // boolean - show repeat button, optional, deafult: false\r\n                useRepeatButton={true}\r\n            /&gt;\r\n        &lt;/&gt;\r\n    );\r\n}\r\n```\r\n\r\n### Result:\r\n"; // CONCATENATED MODULE: ./www/component/example-audio/c-example-audio.tsx
        const meydnPureWater = demoUrl + '/audio-file/meydn-pure-water.mp3';
        const icon64 = demoUrl + '/image-file/react-icon-64.png';
        const icon128 = demoUrl + '/image-file/react-icon-128.png';
        const icon256 = demoUrl + '/image-file/react-icon-256.png';
        const icon512 = demoUrl + '/image-file/react-icon-512.png';
        function ExampleAudio() {
            const singleAudioData = {
                mediaMetadata: {
                    album: 'Interplanetary Forest',
                    artist: 'Meydän',
                    artwork: [
                        {sizes: '64x64', src: icon64, type: 'image/png'},
                        {sizes: '128x128', src: icon128, type: 'image/png'},
                        {sizes: '256x256', src: icon256, type: 'image/png'},
                        {sizes: '512x512', src: icon512, type: 'image/png'},
                    ],
                    title: 'Pure Water',
                },
                src: meydnPureWater,
            };
            return (0, jsx_runtime_.jsxs)(
                'div',
                Object.assign(
                    {className: 'example-wrapper'},
                    {
                        children: [
                            (0, jsx_runtime_.jsx)(
                                Markdown,
                                {config: {useWrapper: false}, mdInput: example_audio},
                                void 0
                            ),
                            (0, jsx_runtime_.jsx)(
                                external_react_audio_player_pro_namespaceObject.Audio,
                                {
                                    mediaMetadata: singleAudioData.mediaMetadata,
                                    src: singleAudioData.src,
                                    useRepeatButton: true,
                                },
                                void 0
                            ),
                            (0, jsx_runtime_.jsx)(
                                external_react_audio_player_pro_namespaceObject.AudioPlayerControlSprite,
                                {},
                                void 0
                            ),
                        ],
                    }
                ),
                void 0
            );
        } // CONCATENATED MODULE: ./www/component/example-audio-player/example-audio-player.md

        /* harmony default export */ const example_audio_player =
            "### Example &lt;AudioPlayer/&gt;\r\n\r\n```javascript\r\nimport React from 'react';\r\nimport {AudioPlayerControlSprite, AudioPlayer, type TrackType} from 'react-audio-player-pro';\r\nimport reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';\r\n\r\nconst audioTrackList: Array&lt;TrackType&gt; = [\r\n    {\r\n        // string - path to audio file, required\r\n        src: '/path/to/audio/file',\r\n\r\n        // JSX.Element - custom content instead of title, optional, deafult: &lt;title&gt or &lt;src&gt\r\n        content: &lt;CustomContent/&gt;,\r\n\r\n        // MediaMetadata - media meta data, see `mediaMetadata` above\r\n        // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata\r\n        // optional\r\n        mediaMetadata: {\r\n            title: 'Lesser Faith',\r\n            artist: 'J. Syreus Bach',\r\n            album: 'Ability to Break ~ Energetic Tracks',\r\n            artwork: [\r\n                {src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png'},\r\n                {src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png'},\r\n            ],\r\n        },\r\n    },\r\n    // other tracks here...\r\n];\r\n\r\nexport function ExampleAudioPlayer() {\r\n    return (\r\n        &lt;&gt;\r\n            &lt;AudioPlayerControlSprite/&gt;\r\n            &lt;AudioPlayer\r\n                // Array&lt;TrackType&gt; - list of track, see `audioTrackList` above, required\r\n                trackList={audioTrackList}\r\n\r\n                // string - wrapper's class name, optional, deafult: ''\r\n                className=\"my-class-name\"\r\n\r\n                // callback function - called on did mount, optional, default: noop\r\n                onDidMount={console.log}\r\n\r\n                // default player state, optional\r\n                defaultState={{\r\n                    // boolean - is player muted, optional, default: false\r\n                    isMuted: false,\r\n\r\n                    // number - active song index, optional, default: 0\r\n                    activeIndex: 0,\r\n\r\n                    // boolean - is shuffle on, optional, default: false\r\n                    isShuffleOn: false,\r\n\r\n                    // boolean - is track list open, optional, default: true\r\n                    isTrackListOpen: true,\r\n\r\n                    // string: 'none' | 'all' | 'one' - repeating state, optional, default: 'none'\r\n                    repeatingState: 'none',\r\n                }}\r\n            /&gt;\r\n        &lt;/&gt;\r\n    );\r\n}\r\n```\r\n\r\n### Result:\r\n"; // CONCATENATED MODULE: ./www/component/example-audio-player/c-custom-content.tsx
        function CustomContent() {
            return (0, jsx_runtime_.jsx)(
                'a',
                Object.assign(
                    {href: 'https://www.npmjs.com/package/react-audio-player-pro', rel: 'noreferrer', target: '_blank'},
                    {children: 'Your custom `content`'}
                ),
                void 0
            );
        } // CONCATENATED MODULE: ./www/component/example-audio-player/c-example-audio-player.tsx

        // import 'react-audio-player-pro/dist/style.css';

        const c_example_audio_player_icon64 = demoUrl + '/image-file/react-icon-64.png';
        const c_example_audio_player_icon128 = demoUrl + '/image-file/react-icon-128.png';
        const c_example_audio_player_icon256 = demoUrl + '/image-file/react-icon-256.png';
        const c_example_audio_player_icon512 = demoUrl + '/image-file/react-icon-512.png';
        const lesserFaith = demoUrl + '/audio-file/j-syreus-bach-lesser-faith.mp3';
        const brothersAllegretto = demoUrl + '/audio-file/dee-yan-key-world-of-brothers-allegretto.mp3';
        const atLeastItIs = demoUrl + '/audio-file/mid-air-machine-at-least-it-is.mp3';
        const theGhostInYourPiano = demoUrl + '/audio-file/the-ghost-in-your-piano-climb.mp3';
        const audioDataList = [
            {
                mediaMetadata: {
                    album: 'Ability to Break ~ Energetic Tracks',
                    artist: 'J. Syreus Bach',
                    artwork: [
                        {sizes: '64x64', src: c_example_audio_player_icon64, type: 'image/png'},
                        {sizes: '128x128', src: c_example_audio_player_icon128, type: 'image/png'},
                        {sizes: '256x256', src: c_example_audio_player_icon256, type: 'image/png'},
                        {sizes: '512x512', src: c_example_audio_player_icon512, type: 'image/png'},
                    ],
                    title: 'Lesser Faith',
                },
                src: lesserFaith,
            },
            {
                content: (0, jsx_runtime_.jsx)(CustomContent, {}, void 0),
                mediaMetadata: {
                    album: 'Perpetual Peace',
                    artist: 'Dee Yan-Key',
                    artwork: [
                        {sizes: '64x64', src: c_example_audio_player_icon64, type: 'image/png'},
                        {sizes: '128x128', src: c_example_audio_player_icon128, type: 'image/png'},
                        {sizes: '256x256', src: c_example_audio_player_icon256, type: 'image/png'},
                        {sizes: '512x512', src: c_example_audio_player_icon512, type: 'image/png'},
                    ],
                    title: 'World of Brothers (Allegretto)',
                },
                src: brothersAllegretto,
            },
            {
                mediaMetadata: {
                    album: 'Everywhere Outside ~ World Music',
                    artist: 'Mid-Air Machine',
                    artwork: [
                        {sizes: '64x64', src: c_example_audio_player_icon64, type: 'image/png'},
                        {sizes: '128x128', src: c_example_audio_player_icon128, type: 'image/png'},
                        {sizes: '256x256', src: c_example_audio_player_icon256, type: 'image/png'},
                        {sizes: '512x512', src: c_example_audio_player_icon512, type: 'image/png'},
                    ],
                    title: 'At Least It Is',
                },
                src: atLeastItIs,
            },
            {
                mediaMetadata: {
                    album: 'The Ghost in Your Piano',
                    artist: 'The Ghost in Your Piano',
                    artwork: [
                        {sizes: '64x64', src: c_example_audio_player_icon64, type: 'image/png'},
                        {sizes: '128x128', src: c_example_audio_player_icon128, type: 'image/png'},
                        {sizes: '256x256', src: c_example_audio_player_icon256, type: 'image/png'},
                        {sizes: '512x512', src: c_example_audio_player_icon512, type: 'image/png'},
                    ],
                    title: 'Climb',
                },
                src: theGhostInYourPiano,
            },
        ];
        function ExamplePlayer() {
            return (0, jsx_runtime_.jsxs)(
                'div',
                Object.assign(
                    {className: 'example-wrapper'},
                    {
                        children: [
                            (0, jsx_runtime_.jsx)(
                                Markdown,
                                {config: {useWrapper: false}, mdInput: example_audio_player},
                                void 0
                            ),
                            (0, jsx_runtime_.jsx)(
                                external_react_audio_player_pro_namespaceObject.AudioPlayer,
                                {
                                    defaultState: {
                                        activeIndex: 0,
                                        isMuted: false,
                                        isShuffleOn: false,
                                        isTrackListOpen: true,
                                        repeatingState: 'none',
                                    },
                                    trackList: audioDataList,
                                },
                                void 0
                            ),
                            (0, jsx_runtime_.jsx)(
                                external_react_audio_player_pro_namespaceObject.AudioPlayerControlSprite,
                                {},
                                void 0
                            ),
                        ],
                    }
                ),
                void 0
            );
        } // CONCATENATED MODULE: external "ajv"

        const external_ajv_namespaceObject = require('ajv');
        var external_ajv_default = /*#__PURE__*/ __webpack_require__.n(external_ajv_namespaceObject); // CONCATENATED MODULE: ./www/util/object.ts
        function isObjectInclude(object, query) {
            return Object.keys(query).every(queryKey => query[queryKey] === object[queryKey]);
        }
        const ajv = new (external_ajv_default())();
        function getExpectedStructure(data, jsonSchema) {
            const validate = ajv.compile(jsonSchema);
            if (validate(data)) {
                return data;
            }
            throw new Error(JSON.stringify(validate.errors));
        } // CONCATENATED MODULE: ./www/util/fetch.ts

        /* global fetch, Headers, FormData, Response, File */

        var FetchMethodEnum;
        (function (FetchMethodEnum) {
            FetchMethodEnum['delete'] = 'DELETE';
            FetchMethodEnum['get'] = 'GET';
            FetchMethodEnum['patch'] = 'PATCH';
            FetchMethodEnum['post'] = 'POST';
            FetchMethodEnum['put'] = 'PUT';
        })(FetchMethodEnum || (FetchMethodEnum = {}));
        const fetchCache = {};
        function invalidateCache(options) {
            const {method} = options || {};
            if (!method || method === FetchMethodEnum.get) {
                return;
            }
            Object.keys(fetchCache).forEach(key => {
                fetchCache[key] = null;
            });
        }
        function fetchEndCallBack(fetchBeginTimeStamp, url) {
            const maxFetchingTime = 2e3; // 2 seconds
            const fetchEndTimeStamp = Date.now();
            const fetchingTime = fetchEndTimeStamp - fetchBeginTimeStamp;
            if (fetchingTime > maxFetchingTime) {
                console.log(`%c[WARNING]: "${url}" took %c${fetchingTime / 1e3}s`, 'color: #00c', 'color: #c00');
            }
        }
        async function fetchX(url, jsonSchema, options) {
            invalidateCache(options);
            const cacheProperty = `${url} - ${JSON.stringify(options || '[empty]')}`;
            const savedPromiseResult = fetchCache[cacheProperty];
            if (savedPromiseResult) {
                // console.log(`[fetchX]: [CACHE]\n> url: ${url},\n> options: ${JSON.stringify(options || '[empty]')}`);
                // return savedPromiseResult as Promise<ExpectedResponseType>;
                return getExpectedStructure(savedPromiseResult, jsonSchema);
            }
            const fetchBeginTimeStamp = Date.now();
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const fetchResult = getExpectedStructure(await response.json(), jsonSchema);
                fetchCache[cacheProperty] = fetchResult;
                return fetchResult;
            } catch (error) {
                fetchCache[cacheProperty] = null;
                console.error(error);
                throw error;
            } finally {
                fetchEndCallBack(fetchBeginTimeStamp, url);
            }
        } // CONCATENATED MODULE: ./www/util/system.ts

        function getIsBrowser() {
            return typeof window !== 'undefined';
        }
        const isBrowser = getIsBrowser(); // CONCATENATED MODULE: ./www/layout/guard-suspense.tsx

        function GuardSuspense(props) {
            const {children, fallback} = props;
            return isBrowser
                ? (0, jsx_runtime_.jsx)(
                      external_react_.Suspense,
                      Object.assign({fallback: fallback}, {children: children}),
                      void 0
                  )
                : fallback;
        }

        // EXTERNAL MODULE: ./www/page/home/image/marker-icon-2x.png
        var marker_icon_2x = __webpack_require__(436);
        // EXTERNAL MODULE: ./www/page/home/image/questions-with-an-official-answer.svg
        var questions_with_an_official_answer = __webpack_require__(103);
        // EXTERNAL MODULE: ./www/page/home/home.scss
        var home = __webpack_require__(695); // CONCATENATED MODULE: ./www/page/home/home.tsx
        /* global setTimeout */

        console.log(error_data /* ErrorData */.K);
        const myIpSchema = {
            additionalProperties: false,
            properties: {
                // eslint-disable-next-line id-length
                ip: {type: 'string'},
            },
            required: ['ip'],
            type: 'object',
        };
        const LoadMeAsync = (0, external_react_.lazy)(() =>
            __webpack_require__
                .e(/* import() | load-me-async */ 443)
                .then(__webpack_require__.bind(__webpack_require__, 389))
        );
        const htmlCode = external_markdown_pro_default()('# Markdown Pro'); // <h1>Markdown Pro</h1>
        const config = {
            parseLink: true,
            useLineBreak: true,
            useWrapper: true,
            wrapperClassName: 'my-markdown-pro',
        };
        const htmlCodeConfigured = external_markdown_pro_default()('# Markdown Pro', config);
        console.log(htmlCode, htmlCodeConfigured);
        function Home() {
            const {getLocalizedString, setLocaleName, localeName} = (0, locale_context /* useLocale */.bU)();
            const {getFormattedNumber} = useFormat();
            const {screenInfo} = (0, external_react_system_hook_.useSystem)();
            const [isOpen, setIsOpen] = (0, external_react_.useState)(false);
            const [myIp, setMyIp] = (0, external_react_.useState)(null);
            setTimeout(() => {
                console.log(isOpen);
                setIsOpen(false);
            }, 1e3);
            (0, external_react_.useEffect)(() => {
                (async () => {
                    const myPpData = await fetchX('https://api.ipify.org?format=json', myIpSchema);
                    setMyIp(myPpData);
                })();
            }, []);
            (0, external_react_.useEffect)(() => {
                console.log('home');
            });
            console.log('evaluate home');
            return (0, jsx_runtime_.jsxs)(
                'div',
                {
                    children: [
                        (0, jsx_runtime_.jsxs)(
                            'h1',
                            Object.assign(
                                {className: home /* default.home_header */.Z.home_header},
                                {children: ['home page (', (0, jsx_runtime_.jsx)(AsciiSpinner, {}, void 0), ')']}
                            ),
                            void 0
                        ),
                        (0, jsx_runtime_.jsxs)(
                            'h4',
                            {
                                children: [
                                    'your ip is: ',
                                    myIp ? myIp.ip : (0, jsx_runtime_.jsx)(AsciiSpinner, {}, void 0),
                                ],
                            },
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)('hr', {}, void 0),
                        (0, jsx_runtime_.jsx)(
                            'button',
                            Object.assign(
                                {
                                    'data-test-data': getTestNodeData({data: 'some-string'}),
                                    'data-test-id': getTestNodeId('language-button'),
                                    onClick: () =>
                                        setLocaleName(
                                            localeName === locale_context_type /* LocaleNameEnum.enUs */.S.enUs
                                                ? locale_context_type /* LocaleNameEnum.ruRu */.S.ruRu
                                                : locale_context_type /* LocaleNameEnum.enUs */.S.enUs
                                        ),
                                    type: 'button',
                                },
                                {children: localeName}
                            ),
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)('hr', {}, void 0),
                        (0, jsx_runtime_.jsx)(
                            external_react_router_dom_hook_.NavigationLink,
                            Object.assign({to: app_route /* appRoute.info.path */.$.info.path}, {children: 'to info'}),
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)('hr', {}, void 0),
                        (0, jsx_runtime_.jsx)(
                            'code',
                            {children: getFormattedNumber(321, {style: 'unit', unit: 'liter', unitDisplay: 'long'})},
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)('pre', {children: JSON.stringify(screenInfo, null, 4)}, void 0),
                        (0, jsx_runtime_.jsx)(locale_context /* Locale */.go, {stringKey: 'BUTTON__APPLY'}, void 0),
                        (0, jsx_runtime_.jsx)('h4', {children: getLocalizedString('BUTTON__APPLY')}, void 0),
                        (0, jsx_runtime_.jsx)('img', {alt: '', src: marker_icon_2x}, void 0),
                        (0, jsx_runtime_.jsx)(
                            'img',
                            {alt: '', src: questions_with_an_official_answer /* default */.Z},
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)(questions_with_an_official_answer /* ReactComponent */.r, {}, void 0),
                        (0, jsx_runtime_.jsx)(
                            GuardSuspense,
                            Object.assign(
                                {fallback: (0, jsx_runtime_.jsx)(Spinner, {position: 'absolute'}, void 0)},
                                {children: (0, jsx_runtime_.jsx)(LoadMeAsync, {smth: 'smth'}, void 0)}
                            ),
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)(
                            LibraryComponent,
                            Object.assign(
                                {textContent: 'Hello, World'},
                                {children: (0, jsx_runtime_.jsx)('p', {children: 'inner text'}, void 0)}
                            ),
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)('hr', {}, void 0),
                        (0, jsx_runtime_.jsx)(ExampleAudio, {}, void 0),
                        (0, jsx_runtime_.jsx)(ExamplePlayer, {}, void 0),
                    ],
                },
                void 0
            );
        } // CONCATENATED MODULE: ./www/page/info/info-async.tsx

        function AsyncInfo() {
            const AsyncInfoLazy = (0, external_react_.lazy)(() =>
                __webpack_require__
                    .e(/* import() | page-info */ 672)
                    .then(__webpack_require__.bind(__webpack_require__, 972))
            );
            return (0, jsx_runtime_.jsx)(
                GuardSuspense,
                Object.assign(
                    {fallback: (0, jsx_runtime_.jsx)(Spinner, {position: 'absolute'}, void 0)},
                    {children: (0, jsx_runtime_.jsx)(AsyncInfoLazy, {}, void 0)}
                ),
                void 0
            );
        } // CONCATENATED MODULE: ./www/layout/is-render/is-render.tsx

        function IsRender(props) {
            const {isRender, children} = props;
            if (isRender) {
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return (0, jsx_runtime_.jsx)(jsx_runtime_.Fragment, {children: children}, void 0);
            }
            return null;
        } // CONCATENATED MODULE: ./www/layout/is-hidden/is-hidden.scss

        // extracted by mini-css-extract-plugin
        /* harmony default export */ const is_hidden = {'is_hidden': 'c55e81', 'is_hidden__hidden': 'e1b7a2'}; // CONCATENATED MODULE: ./www/layout/is-hidden/is-hidden.tsx
        function IsHidden(props) {
            const {isHidden, children, className} = props;
            const fullClassName = (0, css /* classNames */.A)(
                is_hidden.is_hidden,
                {[is_hidden.is_hidden__hidden]: isHidden},
                className
            );
            return (0, jsx_runtime_.jsx)(
                'div',
                Object.assign({className: fullClassName}, {children: children}),
                void 0
            );
        } // CONCATENATED MODULE: ./www/layout/empty/image/empty.svg

        var _path, _path2, _path3;

        function _extends() {
            _extends =
                Object.assign ||
                function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };
            return _extends.apply(this, arguments);
        }

        function SvgEmpty(props) {
            return /*#__PURE__*/ React.createElement(
                'svg',
                _extends(
                    {
                        width: 184,
                        height: 117,
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                    },
                    props
                ),
                _path ||
                    (_path = /*#__PURE__*/ React.createElement('path', {
                        d: 'M92 117c50.81 0 92-8.943 92-19.976 0-11.032-41.19-19.975-92-19.975S0 85.992 0 97.024C0 108.057 41.19 117 92 117z',
                        fill: '#F5F5F5',
                    })),
                _path2 ||
                    (_path2 = /*#__PURE__*/ React.createElement('path', {
                        d: 'M158.125 39.266l-29.17-32.822c-1.4-2.238-3.444-3.59-5.597-3.59H60.642c-2.153 0-4.197 1.352-5.597 3.587l-29.17 32.828v26.365h132.25V39.266z',
                        stroke: '#D9D9D9',
                    })),
                _path3 ||
                    (_path3 = /*#__PURE__*/ React.createElement('path', {
                        d: 'M119.637 48.315c0-4.58 2.858-8.361 6.403-8.364h32.085v51.757c0 6.058-3.795 11.024-8.481 11.024H34.356c-4.686 0-8.481-4.969-8.481-11.024V39.951H57.96c3.545 0 6.403 3.776 6.403 8.356v.063c0 4.58 2.889 8.278 6.431 8.278h42.412c3.542 0 6.431-3.733 6.431-8.313v-.02z',
                        fill: '#FAFAFA',
                        stroke: '#D9D9D9',
                    }))
            );
        }

        /* harmony default export */ const empty = __webpack_require__.p + 'acf93e3.svg'; // CONCATENATED MODULE: ./www/layout/empty/empty.scss

        // extracted by mini-css-extract-plugin
        /* harmony default export */ const empty_empty = {
            'empty': 'fcae9b',
            'empty__image': 'b64fa9',
            'empty__header': 'c41eb1',
            'empty__text': 'd585be',
        }; // CONCATENATED MODULE: ./www/layout/empty/empty.tsx
        function Empty(props) {
            const {className, mainText, secondaryText} = props;
            const mainTextNode = (0, external_react_.useMemo)(() => {
                if (!mainText) {
                    return null;
                }
                return (0, jsx_runtime_.jsx)(
                    'h4',
                    Object.assign(
                        {className: empty_empty.empty__header},
                        {children: (0, jsx_runtime_.jsx)(locale_context /* Locale */.go, {stringKey: mainText}, void 0)}
                    ),
                    void 0
                );
            }, [mainText]);
            const secondaryTextNode = (0, external_react_.useMemo)(() => {
                if (!secondaryText) {
                    return null;
                }
                return (0, jsx_runtime_.jsx)(
                    'p',
                    Object.assign(
                        {className: empty_empty.empty__text},
                        {
                            children: (0, jsx_runtime_.jsx)(
                                locale_context /* Locale */.go,
                                {stringKey: secondaryText},
                                void 0
                            ),
                        }
                    ),
                    void 0
                );
            }, [secondaryText]);
            return (0, jsx_runtime_.jsxs)(
                'div',
                Object.assign(
                    {className: (0, css /* classNames */.A)(empty_empty.empty, className)},
                    {
                        children: [
                            (0, jsx_runtime_.jsx)(
                                'img',
                                {alt: '', className: empty_empty.empty__image, src: empty},
                                void 0
                            ),
                            mainTextNode,
                            secondaryTextNode,
                        ],
                    }
                ),
                void 0
            );
        } // CONCATENATED MODULE: ./www/page/error-404/error-404.tsx

        function Error404() {
            return (0, jsx_runtime_.jsxs)(
                'div',
                {
                    children: [
                        (0, jsx_runtime_.jsx)('h1', {children: 'Page 404'}, void 0),
                        (0, jsx_runtime_.jsx)(
                            IsRender,
                            Object.assign(
                                {isRender: false},
                                {
                                    children: (0, jsx_runtime_.jsxs)(
                                        IsHidden,
                                        Object.assign(
                                            {isHidden: false},
                                            {
                                                children: [
                                                    (0, jsx_runtime_.jsx)(
                                                        Empty,
                                                        {
                                                            mainText: 'EMPTY__THERE_IS_NOTHING_HERE_YET',
                                                            secondaryText: 'EMPTY__TRY_CHANGING_FILTERS',
                                                        },
                                                        void 0
                                                    ),
                                                    (0, jsx_runtime_.jsx)(Spinner, {position: 'static'}, void 0),
                                                ],
                                            }
                                        ),
                                        void 0
                                    ),
                                }
                            ),
                            void 0
                        ),
                    ],
                },
                void 0
            );
        } // CONCATENATED MODULE: ./www/component/app/app-routing.tsx

        function AppRouting() {
            const switchNode = (0, jsx_runtime_.jsxs)(
                external_react_router_dom_namespaceObject.Switch,
                {
                    children: [
                        (0, jsx_runtime_.jsx)(
                            external_react_router_dom_namespaceObject.Route,
                            {component: Home, exact: true, path: app_route /* appRoute.root.path */.$.root.path},
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)(
                            external_react_router_dom_namespaceObject.Route,
                            {component: AsyncInfo, exact: true, path: app_route /* appRoute.info.path */.$.info.path},
                            void 0
                        ),
                        (0, jsx_runtime_.jsx)(
                            external_react_router_dom_namespaceObject.Route,
                            {component: Error404},
                            void 0
                        ),
                    ],
                },
                void 0
            );
            return isBrowser
                ? (0, jsx_runtime_.jsx)(
                      external_react_router_dom_namespaceObject.BrowserRouter,
                      {children: switchNode},
                      void 0
                  )
                : (0, jsx_runtime_.jsx)(
                      external_react_router_dom_namespaceObject.StaticRouter,
                      {children: switchNode},
                      void 0
                  );
        } // CONCATENATED MODULE: ./www/component/app/app.tsx

        function App() {
            return (0, jsx_runtime_.jsx)(
                AppProvider,
                {children: (0, jsx_runtime_.jsx)(AppRouting, {}, void 0)},
                void 0
            );
        } // CONCATENATED MODULE: ./server/server.tsx

        // const http = require('http');

        console.warn('server');
        // const htmlString = ReactDOMServer.renderToStaticMarkup(<App/>);
        console.warn(server_default().renderToStaticMarkup((0, jsx_runtime_.jsx)(App, {}, void 0)));
    })();

    /******/
})();
//# sourceMappingURL=index.js.map
