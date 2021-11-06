(() => {
    'use strict';
    var e,
        t = {
            103: (e, t, r) => {
                r.d(t, {Z: () => s, r: () => o});
                var n,
                    a = r(689);
                function i() {
                    return (
                        (i =
                            Object.assign ||
                            function (e) {
                                for (var t = 1; t < arguments.length; t++) {
                                    var r = arguments[t];
                                    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                                }
                                return e;
                            }),
                        i.apply(this, arguments)
                    );
                }
                function o(e) {
                    return a.createElement(
                        'svg',
                        i({width: 32, height: 32, fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg'}, e),
                        n ||
                            (n = a.createElement('path', {
                                d: 'M16 .5C7.437.5.5 7.438.5 16c0 8.563 6.938 15.5 15.5 15.5 8.563 0 15.5-6.938 15.5-15.5C31.5 7.437 24.562.5 16 .5zm0 28C9.106 28.5 3.5 22.894 3.5 16S9.106 3.5 16 3.5 28.5 9.106 28.5 16 22.894 28.5 16 28.5zM11 15c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2-1.106 0-2 .894-2 2 0 1.106.894 2 2 2zm10 0c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2-1.106 0-2 .894-2 2 0 1.106.894 2 2 2zm.25 4.538A6.82 6.82 0 0116 22a6.8 6.8 0 01-5.25-2.462 1.504 1.504 0 00-2.113-.194 1.504 1.504 0 00-.193 2.112A9.81 9.81 0 0016 24.994a9.81 9.81 0 007.556-3.538 1.498 1.498 0 00-.194-2.112 1.504 1.504 0 00-2.112.194z',
                            }))
                    );
                }
                const s = r.p + 'e2f0c34.svg';
            },
            695: (e, t, r) => {
                r.d(t, {Z: () => n});
                const n = {home_header: 'e4e05a'};
            },
            253: (e, t, r) => {
                r.d(t, {K: () => o});
                var n = r(997),
                    a = r(643),
                    i = r(935);
                function o(e) {
                    const {langKey: t, className: r} = e;
                    return (0, n.jsx)(
                        'div',
                        Object.assign(
                            {className: (0, a.A)('f9913c', r)},
                            {
                                children: (0, n.jsx)(
                                    'p',
                                    Object.assign(
                                        {className: 'a52e89'},
                                        {children: (0, n.jsx)(i.go, {stringKey: t}, void 0)}
                                    ),
                                    void 0
                                ),
                            }
                        ),
                        void 0
                    );
                }
            },
            598: (e, t, r) => {
                var n;
                r.d(t, {S: () => n}),
                    (function (e) {
                        (e.enUs = 'en-US'), (e.ruRu = 'ru-RU'), (e.zhCn = 'zh-CN'), (e.zhTw = 'zh-TW');
                    })(n || (n = {}));
            },
            935: (e, t, r) => {
                r.d(t, {go: () => p, _C: () => u, bU: () => _});
                const n = require('react-localization-library'),
                    a = {
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
                    },
                    i = {...a, META__LANGUAGE_NAME: '简体中文'},
                    o = {...a, META__LANGUAGE_NAME: '繁體中文'};
                var s = r(598);
                const l = {
                        [s.S.enUs]: a,
                        [s.S.ruRu]: {
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
                        },
                        [s.S.zhCn]: i,
                        [s.S.zhTw]: o,
                    },
                    c = (s.S.enUs, {localStorage: {localeName: 'my-locale-name-v.1.0'}}),
                    d = {
                        defaultLocaleName: (function (e) {
                            const [t] = e;
                            if ('undefined' == typeof localStorage || 'undefined' == typeof navigator) return t;
                            const r = localStorage.getItem(c.localStorage.localeName);
                            for (const t of e) if (t === r) return t;
                            const n = navigator.languages;
                            for (const t of n) for (const r of e) if (t === r) return r;
                            return t;
                        })(Object.values(s.S)),
                        localization: l,
                        onUseEffect: e => {
                            const {localeName: t} = e;
                            !(function (e) {
                                c.localStorage.localeName, localStorage.setItem(c.localStorage.localeName, e);
                            })(t);
                        },
                    },
                    {LocalizationProvider: u, Locale: p, useLocale: _} = (0, n.createLocalization)(d);
            },
            643: (e, t, r) => {
                function n(...e) {
                    const t = [];
                    for (const r of e)
                        if (r)
                            if ('string' != typeof r) for (const e in r) r[e] && t.push(e);
                            else t.push(r);
                    return t.join(' ');
                }
                r.d(t, {A: () => n});
            },
            436: (e, t, r) => {
                e.exports = r.p + 'build-asset/680f69.png';
            },
            689: e => {
                e.exports = require('react');
            },
            882: e => {
                e.exports = require('react-system-hook');
            },
            997: e => {
                e.exports = require('react/jsx-runtime');
            },
        },
        r = {};
    function n(e) {
        var a = r[e];
        if (void 0 !== a) return a.exports;
        var i = (r[e] = {exports: {}});
        return t[e](i, i.exports, n), i.exports;
    }
    (n.m = t),
        (n.n = e => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return n.d(t, {a: t}), t;
        }),
        (n.d = (e, t) => {
            for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]});
        }),
        (n.f = {}),
        (n.e = e => Promise.all(Object.keys(n.f).reduce((t, r) => (n.f[r](e, t), t), []))),
        (n.u = e => ({443: 'load-me-async', 672: 'page-info'}[e] + '.' + n.h().slice(0, 6) + '.chunk.js')),
        (n.miniCssF = e => {}),
        (n.h = () => 'a8104722c3d1983584c0'),
        (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (n.r = e => {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
                Object.defineProperty(e, '__esModule', {value: !0});
        }),
        (n.p = '/static/'),
        (e = {179: 1}),
        (n.f.require = (t, r) => {
            e[t] ||
                (t => {
                    var r = t.modules,
                        a = t.ids,
                        i = t.runtime;
                    for (var o in r) n.o(r, o) && (n.m[o] = r[o]);
                    i && i(n);
                    for (var s = 0; s < a.length; s++) e[a[s]] = 1;
                })(require('./' + n.u(t)));
        }),
        (() => {
            var e = n(997),
                t = n(689);
            const r = require('react-dom/server');
            var a = n.n(r),
                i = n(935);
            function o(r) {
                const {children: n} = r;
                return (0, e.jsx)(t.StrictMode, {children: (0, e.jsx)(i._C, {children: n}, void 0)}, void 0);
            }
            const s = require('react-router-dom');
            var l = n(882);
            const c = require('markdown-pro');
            var d = n.n(c),
                u = n(643);
            const p = 48;
            var _;
            function T(t) {
                const {
                    size: r = p,
                    lineWidth: n,
                    arcColor: a,
                    circleColor: i,
                    isShow: o,
                    wrapperWidth: s,
                    wrapperHeight: l,
                    position: c = _.static,
                    wrapperColor: d,
                    wrapperPadding: T,
                    className: m,
                } = t;
                if (!1 === o) return null;
                const g = {borderColor: i, borderTopColor: a, borderWidth: n, height: r, width: r},
                    E = {backgroundColor: d, height: l, minHeight: r, minWidth: r, padding: T, position: c, width: s};
                return (0, e.jsx)(
                    'div',
                    Object.assign(
                        {'aria-busy': 'true', className: (0, u.A)('c8fad8', m), style: E},
                        {children: (0, e.jsx)('div', {className: 'c2a665', style: g}, void 0)}
                    ),
                    void 0
                );
            }
            !(function (e) {
                (e.absolute = 'absolute'), (e.fixed = 'fixed'), (e.relative = 'relative'), (e.static = 'static');
            })(_ || (_ = {}));
            var m,
                g = n(253),
                E = n(598);
            !(function (e) {
                (e.day = 'day'),
                    (e.hour = 'hour'),
                    (e.minute = 'minute'),
                    (e.month = 'month'),
                    (e.second = 'second'),
                    (e.year = 'year');
            })(m || (m = {}));
            const f = Boolean(!0),
                N = f
                    ? function () {
                          return null;
                      }
                    : function (e) {
                          return e;
                      },
                h = f
                    ? function () {
                          return null;
                      }
                    : function (e) {
                          return 'string' == typeof e ? e : JSON.stringify(e);
                      };
            function O(t) {
                const {children: r, textContent: n} = t;
                return (0, e.jsxs)(
                    'div',
                    Object.assign(
                        {className: 'e483b3'},
                        {
                            children: [
                                (0, e.jsx)('h3', Object.assign({className: 'f561fb'}, {children: n}), void 0),
                                (0, e.jsx)('div', {children: r}, void 0),
                            ],
                        }
                    ),
                    void 0
                );
            }
            function y(t) {
                const {isShow: r = !0, className: n} = t;
                if (!r) return null;
                const a = (0, u.A)('feccdd', n);
                return (0, e.jsx)('span', {'aria-busy': 'true', className: a}, void 0);
            }
            const v = require('react-audio-player-pro'),
                A = 'http://webbestmaster.github.io/react-audio-player-pro';
            function x(t) {
                const {mdInput: r, config: n} = t;
                return (0, e.jsx)(
                    'div',
                    {className: 'md-pro', dangerouslySetInnerHTML: {__html: (0, c.markdown)(r, n)}},
                    void 0
                );
            }
            function S() {
                const t = {
                    mediaMetadata: {
                        album: 'Interplanetary Forest',
                        artist: 'Meydän',
                        artwork: [
                            {
                                sizes: '64x64',
                                src: 'http://webbestmaster.github.io/react-audio-player-pro/image-file/react-icon-64.png',
                                type: 'image/png',
                            },
                            {
                                sizes: '128x128',
                                src: 'http://webbestmaster.github.io/react-audio-player-pro/image-file/react-icon-128.png',
                                type: 'image/png',
                            },
                            {
                                sizes: '256x256',
                                src: 'http://webbestmaster.github.io/react-audio-player-pro/image-file/react-icon-256.png',
                                type: 'image/png',
                            },
                            {
                                sizes: '512x512',
                                src: 'http://webbestmaster.github.io/react-audio-player-pro/image-file/react-icon-512.png',
                                type: 'image/png',
                            },
                        ],
                        title: 'Pure Water',
                    },
                    src: 'http://webbestmaster.github.io/react-audio-player-pro/audio-file/meydn-pure-water.mp3',
                };
                return (0, e.jsxs)(
                    'div',
                    Object.assign(
                        {className: 'example-wrapper'},
                        {
                            children: [
                                (0, e.jsx)(
                                    x,
                                    {
                                        config: {useWrapper: !1},
                                        mdInput:
                                            "### Example &lt;Audio/&gt;\r\n\r\n```javascript\r\nimport React from 'react';\r\nimport {AudioPlayerControlSprite, Audio} from 'react-audio-player-pro';\r\nimport reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';\r\n\r\nconst mediaMetadata = {\r\n\r\n    // required\r\n    title: 'Pure Water',\r\n\r\n    // optional\r\n    artist: 'Meydän',\r\n\r\n    // optional\r\n    album: 'Interplanetary Forest',\r\n\r\n    // optional\r\n    artwork: [\r\n\r\n        // src, sizes and type is required\r\n        {src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png'},\r\n        {src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png'},\r\n    ],\r\n};\r\n\r\nexport function ExampleAudio() {\r\n    return (\r\n        &lt;&gt;\r\n            &lt;AudioPlayerControlSprite/&gt;\r\n            &lt;Audio\r\n                // string - path to audio file, required\r\n                src=\"/path/to/audio/file\"\r\n\r\n                // MediaMetadata - media meta data\r\n                // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata\r\n                // optional\r\n                mediaMetadata={mediaMetadata}\r\n\r\n                // string - wrapper's class name, optional, deafult: ''\r\n                className=\"my-class-name\"\r\n\r\n                // callback function - called on did mount, optional, default: noop\r\n                onDidMount={console.log}\r\n\r\n                // string - name for download file, optional, deafult: &lt;src&gt;\r\n                downloadFileName=\"my-file.mp3\"\r\n\r\n                // boolean - show repeat button, optional, deafult: false\r\n                useRepeatButton={true}\r\n            /&gt;\r\n        &lt;/&gt;\r\n    );\r\n}\r\n```\r\n\r\n### Result:\r\n",
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(
                                    v.Audio,
                                    {mediaMetadata: t.mediaMetadata, src: t.src, useRepeatButton: !0},
                                    void 0
                                ),
                                (0, e.jsx)(v.AudioPlayerControlSprite, {}, void 0),
                            ],
                        }
                    ),
                    void 0
                );
            }
            !(function () {
                const {log: e} = console;
                e(
                    '\n\n\n    ███████╗███╗   ███╗██████╗ ████████╗██╗   ██╗\n    ██╔════╝████╗ ████║██╔══██╗╚══██╔══╝╚██╗ ██╔╝\n    █████╗  ██╔████╔██║██████╔╝   ██║    ╚████╔╝\n    ██╔══╝  ██║╚██╔╝██║██╔═══╝    ██║     ╚██╔╝\n    ███████╗██║ ╚═╝ ██║██║        ██║      ██║\n    ╚══════╝╚═╝     ╚═╝╚═╝        ╚═╝      ╚═╝\n\n\n'
                ),
                    e('Build date:', '2021-11-06T13:08:04.614Z'),
                    e('Is production:', !0);
            })();
            const b = A + '/image-file/react-icon-64.png',
                j = A + '/image-file/react-icon-128.png',
                U = A + '/image-file/react-icon-256.png',
                B = A + '/image-file/react-icon-512.png',
                M = [
                    {
                        mediaMetadata: {
                            album: 'Ability to Break ~ Energetic Tracks',
                            artist: 'J. Syreus Bach',
                            artwork: [
                                {sizes: '64x64', src: b, type: 'image/png'},
                                {sizes: '128x128', src: j, type: 'image/png'},
                                {sizes: '256x256', src: U, type: 'image/png'},
                                {sizes: '512x512', src: B, type: 'image/png'},
                            ],
                            title: 'Lesser Faith',
                        },
                        src: 'http://webbestmaster.github.io/react-audio-player-pro/audio-file/j-syreus-bach-lesser-faith.mp3',
                    },
                    {
                        content: (0, e.jsx)(
                            function () {
                                return (0, e.jsx)(
                                    'a',
                                    Object.assign(
                                        {
                                            href: 'https://www.npmjs.com/package/react-audio-player-pro',
                                            rel: 'noreferrer',
                                            target: '_blank',
                                        },
                                        {children: 'Your custom `content`'}
                                    ),
                                    void 0
                                );
                            },
                            {},
                            void 0
                        ),
                        mediaMetadata: {
                            album: 'Perpetual Peace',
                            artist: 'Dee Yan-Key',
                            artwork: [
                                {sizes: '64x64', src: b, type: 'image/png'},
                                {sizes: '128x128', src: j, type: 'image/png'},
                                {sizes: '256x256', src: U, type: 'image/png'},
                                {sizes: '512x512', src: B, type: 'image/png'},
                            ],
                            title: 'World of Brothers (Allegretto)',
                        },
                        src: 'http://webbestmaster.github.io/react-audio-player-pro/audio-file/dee-yan-key-world-of-brothers-allegretto.mp3',
                    },
                    {
                        mediaMetadata: {
                            album: 'Everywhere Outside ~ World Music',
                            artist: 'Mid-Air Machine',
                            artwork: [
                                {sizes: '64x64', src: b, type: 'image/png'},
                                {sizes: '128x128', src: j, type: 'image/png'},
                                {sizes: '256x256', src: U, type: 'image/png'},
                                {sizes: '512x512', src: B, type: 'image/png'},
                            ],
                            title: 'At Least It Is',
                        },
                        src: 'http://webbestmaster.github.io/react-audio-player-pro/audio-file/mid-air-machine-at-least-it-is.mp3',
                    },
                    {
                        mediaMetadata: {
                            album: 'The Ghost in Your Piano',
                            artist: 'The Ghost in Your Piano',
                            artwork: [
                                {sizes: '64x64', src: b, type: 'image/png'},
                                {sizes: '128x128', src: j, type: 'image/png'},
                                {sizes: '256x256', src: U, type: 'image/png'},
                                {sizes: '512x512', src: B, type: 'image/png'},
                            ],
                            title: 'Climb',
                        },
                        src: 'http://webbestmaster.github.io/react-audio-player-pro/audio-file/the-ghost-in-your-piano-climb.mp3',
                    },
                ];
            function D() {
                return (0, e.jsxs)(
                    'div',
                    Object.assign(
                        {className: 'example-wrapper'},
                        {
                            children: [
                                (0, e.jsx)(
                                    x,
                                    {
                                        config: {useWrapper: !1},
                                        mdInput:
                                            "### Example &lt;AudioPlayer/&gt;\r\n\r\n```javascript\r\nimport React from 'react';\r\nimport {AudioPlayerControlSprite, AudioPlayer, type TrackType} from 'react-audio-player-pro';\r\nimport reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';\r\n\r\nconst audioTrackList: Array&lt;TrackType&gt; = [\r\n    {\r\n        // string - path to audio file, required\r\n        src: '/path/to/audio/file',\r\n\r\n        // JSX.Element - custom content instead of title, optional, deafult: &lt;title&gt or &lt;src&gt\r\n        content: &lt;CustomContent/&gt;,\r\n\r\n        // MediaMetadata - media meta data, see `mediaMetadata` above\r\n        // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata\r\n        // optional\r\n        mediaMetadata: {\r\n            title: 'Lesser Faith',\r\n            artist: 'J. Syreus Bach',\r\n            album: 'Ability to Break ~ Energetic Tracks',\r\n            artwork: [\r\n                {src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png'},\r\n                {src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png'},\r\n            ],\r\n        },\r\n    },\r\n    // other tracks here...\r\n];\r\n\r\nexport function ExampleAudioPlayer() {\r\n    return (\r\n        &lt;&gt;\r\n            &lt;AudioPlayerControlSprite/&gt;\r\n            &lt;AudioPlayer\r\n                // Array&lt;TrackType&gt; - list of track, see `audioTrackList` above, required\r\n                trackList={audioTrackList}\r\n\r\n                // string - wrapper's class name, optional, deafult: ''\r\n                className=\"my-class-name\"\r\n\r\n                // callback function - called on did mount, optional, default: noop\r\n                onDidMount={console.log}\r\n\r\n                // default player state, optional\r\n                defaultState={{\r\n                    // boolean - is player muted, optional, default: false\r\n                    isMuted: false,\r\n\r\n                    // number - active song index, optional, default: 0\r\n                    activeIndex: 0,\r\n\r\n                    // boolean - is shuffle on, optional, default: false\r\n                    isShuffleOn: false,\r\n\r\n                    // boolean - is track list open, optional, default: true\r\n                    isTrackListOpen: true,\r\n\r\n                    // string: 'none' | 'all' | 'one' - repeating state, optional, default: 'none'\r\n                    repeatingState: 'none',\r\n                }}\r\n            /&gt;\r\n        &lt;/&gt;\r\n    );\r\n}\r\n```\r\n\r\n### Result:\r\n",
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(
                                    v.AudioPlayer,
                                    {
                                        defaultState: {
                                            activeIndex: 0,
                                            isMuted: !1,
                                            isShuffleOn: !1,
                                            isTrackListOpen: !0,
                                            repeatingState: 'none',
                                        },
                                        trackList: M,
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(v.AudioPlayerControlSprite, {}, void 0),
                            ],
                        }
                    ),
                    void 0
                );
            }
            const P = require('ajv'),
                C = new (n.n(P)())();
            function w(e, t) {
                const r = C.compile(t);
                if (r(e)) return e;
                throw new Error(JSON.stringify(r.errors));
            }
            var L;
            !(function (e) {
                (e.delete = 'DELETE'), (e.get = 'GET'), (e.patch = 'PATCH'), (e.post = 'POST'), (e.put = 'PUT');
            })(L || (L = {}));
            const I = {},
                Y = 'undefined' != typeof window;
            function R(r) {
                const {children: n, fallback: a} = r;
                return Y ? (0, e.jsx)(t.Suspense, Object.assign({fallback: a}, {children: n}), void 0) : a;
            }
            var k = n(436),
                z = n(103),
                G = n(695);
            g.K;
            const W = {additionalProperties: !1, properties: {ip: {type: 'string'}}, required: ['ip'], type: 'object'},
                H = (0, t.lazy)(() => n.e(443).then(n.bind(n, 389)));
            function K() {
                const {getLocalizedString: r, setLocaleName: n, localeName: a} = (0, i.bU)(),
                    {getFormattedNumber: o} = (function () {
                        const {localeName: e} = (0, i.bU)(),
                            r = (0, t.useCallback)(
                                (t, r) =>
                                    (function (e, t, r) {
                                        return new Intl.NumberFormat(e, r).format(t);
                                    })(e, t, r),
                                [e]
                            );
                        return {
                            getFormattedDateTime: (0, t.useCallback)(
                                (t, r) =>
                                    (function (e, t, r) {
                                        return new Intl.DateTimeFormat(e, r).format(t);
                                    })(e, t, r),
                                [e]
                            ),
                            getFormattedNumber: r,
                        };
                    })(),
                    {screenInfo: s} = (0, l.useSystem)(),
                    [c, d] = (0, t.useState)(!1),
                    [u, p] = (0, t.useState)(null);
                return (
                    setTimeout(() => {
                        d(!1);
                    }, 1e3),
                    (0, t.useEffect)(() => {
                        (async () => {
                            const e = await (async function (e, t, r) {
                                !(function (e) {
                                    const {method: t} = {};
                                    t &&
                                        t !== L.get &&
                                        Object.keys(I).forEach(e => {
                                            I[e] = null;
                                        });
                                })();
                                const n = `${e} - ${JSON.stringify('[empty]')}`,
                                    a = I[n];
                                if (a) return w(a, t);
                                Date.now();
                                try {
                                    const a = await fetch(e, r);
                                    if (!a.ok) throw new Error(await a.text());
                                    const i = w(await a.json(), t);
                                    return (I[n] = i), i;
                                } catch (e) {
                                    throw ((I[n] = null), console.error(e), e);
                                } finally {
                                    Date.now();
                                }
                            })('https://api.ipify.org?format=json', W);
                            p(e);
                        })();
                    }, []),
                    (0, t.useEffect)(() => {}),
                    (0, e.jsxs)(
                        'div',
                        {
                            children: [
                                (0, e.jsxs)(
                                    'h1',
                                    Object.assign(
                                        {className: G.Z.home_header},
                                        {children: ['home page (', (0, e.jsx)(y, {}, void 0), ')']}
                                    ),
                                    void 0
                                ),
                                (0, e.jsxs)(
                                    'h4',
                                    {children: ['your ip is: ', u ? u.ip : (0, e.jsx)(y, {}, void 0)]},
                                    void 0
                                ),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(
                                    'button',
                                    Object.assign(
                                        {
                                            'data-test-data': h({data: 'some-string'}),
                                            'data-test-id': N('language-button'),
                                            onClick: () => n(a === E.S.enUs ? E.S.ruRu : E.S.enUs),
                                            type: 'button',
                                        },
                                        {children: a}
                                    ),
                                    void 0
                                ),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(
                                    'code',
                                    {children: o(321, {style: 'unit', unit: 'liter', unitDisplay: 'long'})},
                                    void 0
                                ),
                                (0, e.jsx)('pre', {children: JSON.stringify(s, null, 4)}, void 0),
                                (0, e.jsx)(i.go, {stringKey: 'BUTTON__APPLY'}, void 0),
                                (0, e.jsx)('h4', {children: r('BUTTON__APPLY')}, void 0),
                                (0, e.jsx)('img', {alt: '', src: k}, void 0),
                                (0, e.jsx)('img', {alt: '', src: z.Z}, void 0),
                                (0, e.jsx)(z.r, {}, void 0),
                                (0, e.jsx)(
                                    R,
                                    Object.assign(
                                        {fallback: (0, e.jsx)(T, {position: 'absolute'}, void 0)},
                                        {children: (0, e.jsx)(H, {smth: 'smth'}, void 0)}
                                    ),
                                    void 0
                                ),
                                (0, e.jsx)(
                                    O,
                                    Object.assign(
                                        {textContent: 'Hello, World'},
                                        {children: (0, e.jsx)('p', {children: 'inner text'}, void 0)}
                                    ),
                                    void 0
                                ),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(S, {}, void 0),
                                (0, e.jsx)(D, {}, void 0),
                            ],
                        },
                        void 0
                    )
                );
            }
            function F() {
                const r = (0, t.lazy)(() => n.e(672).then(n.bind(n, 972)));
                return (0, e.jsx)(
                    R,
                    Object.assign(
                        {fallback: (0, e.jsx)(T, {position: 'absolute'}, void 0)},
                        {children: (0, e.jsx)(r, {}, void 0)}
                    ),
                    void 0
                );
            }
            function q(t) {
                const {isRender: r, children: n} = t;
                return r ? (0, e.jsx)(e.Fragment, {children: n}, void 0) : null;
            }
            function V(t) {
                const {isHidden: r, children: n, className: a} = t,
                    i = (0, u.A)('c55e81', {e1b7a2: r}, a);
                return (0, e.jsx)('div', Object.assign({className: i}, {children: n}), void 0);
            }
            d()('# Markdown Pro'),
                d()('# Markdown Pro', {
                    parseLink: !0,
                    useLineBreak: !0,
                    useWrapper: !0,
                    wrapperClassName: 'my-markdown-pro',
                });
            const J = n.p + 'acf93e3.svg';
            function Z(r) {
                const {className: n, mainText: a, secondaryText: o} = r,
                    s = (0, t.useMemo)(
                        () =>
                            a
                                ? (0, e.jsx)(
                                      'h4',
                                      Object.assign(
                                          {className: 'c41eb1'},
                                          {children: (0, e.jsx)(i.go, {stringKey: a}, void 0)}
                                      ),
                                      void 0
                                  )
                                : null,
                        [a]
                    ),
                    l = (0, t.useMemo)(
                        () =>
                            o
                                ? (0, e.jsx)(
                                      'p',
                                      Object.assign(
                                          {className: 'd585be'},
                                          {children: (0, e.jsx)(i.go, {stringKey: o}, void 0)}
                                      ),
                                      void 0
                                  )
                                : null,
                        [o]
                    );
                return (0, e.jsxs)(
                    'div',
                    Object.assign(
                        {className: (0, u.A)('fcae9b', n)},
                        {children: [(0, e.jsx)('img', {alt: '', className: 'b64fa9', src: J}, void 0), s, l]}
                    ),
                    void 0
                );
            }
            function X() {
                return (0, e.jsxs)(
                    'div',
                    {
                        children: [
                            (0, e.jsx)('h1', {children: 'Page 404'}, void 0),
                            (0, e.jsx)(
                                q,
                                Object.assign(
                                    {isRender: !1},
                                    {
                                        children: (0, e.jsxs)(
                                            V,
                                            Object.assign(
                                                {isHidden: !1},
                                                {
                                                    children: [
                                                        (0, e.jsx)(
                                                            Z,
                                                            {
                                                                mainText: 'EMPTY__THERE_IS_NOTHING_HERE_YET',
                                                                secondaryText: 'EMPTY__TRY_CHANGING_FILTERS',
                                                            },
                                                            void 0
                                                        ),
                                                        (0, e.jsx)(T, {position: 'static'}, void 0),
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
            }
            function $() {
                const t = (0, e.jsxs)(
                    s.Routes,
                    {
                        children: [
                            (0, e.jsx)(s.Route, {element: (0, e.jsx)(K, {}, void 0), path: '/'}, void 0),
                            (0, e.jsx)(s.Route, {element: (0, e.jsx)(F, {}, void 0), path: '/info'}, void 0),
                            (0, e.jsx)(s.Route, {element: (0, e.jsx)(X, {}, void 0), path: '*'}, void 0),
                        ],
                    },
                    void 0
                );
                return (0, e.jsx)(s.BrowserRouter, {children: t}, void 0);
            }
            console.warn('server'),
                console.warn(
                    a().renderToStaticMarkup(
                        (0, e.jsx)(
                            function () {
                                return (0, e.jsx)(o, {children: (0, e.jsx)($, {}, void 0)}, void 0);
                            },
                            {},
                            void 0
                        )
                    )
                );
        })();
})();
