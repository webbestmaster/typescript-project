(() => {
    'use strict';
    var e,
        t = {
            436: (e, t, r) => {
                e.exports = r.p + 'build-asset/680f69.png';
            },
            997: e => {
                e.exports = require('react/jsx-runtime');
            },
        },
        r = {};
    function n(e) {
        var i = r[e];
        if (void 0 !== i) return i.exports;
        var a = (r[e] = {exports: {}});
        return t[e](a, a.exports, n), a.exports;
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
        (n.u = e => 'load-me-async-lazy.' + n.h().slice(0, 6) + '.chunk.js'),
        (n.miniCssF = e => 'style.css'),
        (n.h = () => '456aacef58f21bcb258d'),
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
                        i = t.ids,
                        a = t.runtime;
                    for (var o in r) n.o(r, o) && (n.m[o] = r[o]);
                    a && a(n);
                    for (var s = 0; s < i.length; s++) e[i[s]] = 1;
                })(require('./' + n.u(t)));
        }),
        (() => {
            var e = n(997);
            const t = require('react'),
                r = require('react-dom/server');
            var i = n.n(r);
            const a = require('react-localization-library'),
                o = {
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
                s = {...o, META__LANGUAGE_NAME: '简体中文'},
                c = {...o, META__LANGUAGE_NAME: '繁體中文'};
            var l;
            !(function (e) {
                (e.enUs = 'en-US'), (e.ruRu = 'ru-RU'), (e.zhCn = 'zh-CN'), (e.zhTw = 'zh-TW');
            })(l || (l = {}));
            const d = {
                    [l.enUs]: o,
                    [l.ruRu]: {
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
                    [l.zhCn]: s,
                    [l.zhTw]: c,
                },
                u = (l.enUs, {localStorage: {localeName: 'my-locale-name-v.1.0'}}),
                p = {
                    defaultLocaleName: (function (e) {
                        const [t] = e;
                        if ('undefined' == typeof localStorage || 'undefined' == typeof navigator) return t;
                        const r = localStorage.getItem(u.localStorage.localeName);
                        for (const t of e) if (t === r) return t;
                        const n = navigator.languages;
                        for (const t of n) for (const r of e) if (t === r) return r;
                        return t;
                    })(Object.values(l)),
                    localization: d,
                    onUseEffect: e => {
                        const {localeName: t} = e;
                        !(function (e) {
                            u.localStorage.localeName, localStorage.setItem(u.localStorage.localeName, e);
                        })(t);
                    },
                },
                {LocalizationProvider: _, Locale: T, useLocale: m} = (0, a.createLocalization)(p);
            function g(r) {
                const {children: n} = r;
                return (0, e.jsx)(t.StrictMode, {children: (0, e.jsx)(_, {children: n}, void 0)}, void 0);
            }
            const E = require('react-router-dom'),
                f = require('react-system-hook'),
                N = require('react-router-dom-hook'),
                h = require('markdown-pro');
            var O = n.n(h);
            function y(...e) {
                const t = [];
                for (const r of e)
                    if (r)
                        if ('string' != typeof r) for (const e in r) r[e] && t.push(e);
                        else t.push(r);
                return t.join(' ');
            }
            const v = 48;
            var x;
            function A(t) {
                const {
                    size: r = v,
                    lineWidth: n,
                    arcColor: i,
                    circleColor: a,
                    isShow: o,
                    wrapperWidth: s,
                    wrapperHeight: c,
                    position: l = x.static,
                    wrapperColor: d,
                    wrapperPadding: u,
                    className: p,
                } = t;
                if (!1 === o) return null;
                const _ = {borderColor: a, borderTopColor: i, borderWidth: n, height: r, width: r},
                    T = {backgroundColor: d, height: c, minHeight: r, minWidth: r, padding: u, position: l, width: s};
                return (0, e.jsx)(
                    'div',
                    Object.assign(
                        {'aria-busy': 'true', className: y('c8fad8', p), style: T},
                        {children: (0, e.jsx)('div', {className: 'c2a665', style: _}, void 0)}
                    ),
                    void 0
                );
            }
            !(function (e) {
                (e.absolute = 'absolute'), (e.fixed = 'fixed'), (e.relative = 'relative'), (e.static = 'static');
            })(x || (x = {}));
            const S = '/info';
            var b;
            !(function (e) {
                (e.day = 'day'),
                    (e.hour = 'hour'),
                    (e.minute = 'minute'),
                    (e.month = 'month'),
                    (e.second = 'second'),
                    (e.year = 'year');
            })(b || (b = {}));
            const j = Boolean(!0),
                U = j
                    ? function () {
                          return null;
                      }
                    : function (e) {
                          return e;
                      },
                B = j
                    ? function () {
                          return null;
                      }
                    : function (e) {
                          return 'string' == typeof e ? e : JSON.stringify(e);
                      };
            function P(t) {
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
            function M(t) {
                const {isShow: r = !0, className: n} = t;
                if (!r) return null;
                const i = y('feccdd', n);
                return (0, e.jsx)('span', {'aria-busy': 'true', className: i}, void 0);
            }
            const D = require('react-audio-player-pro'),
                w = 'http://webbestmaster.github.io/react-audio-player-pro';
            function L(t) {
                const {mdInput: r, config: n} = t;
                return (0, e.jsx)(
                    'div',
                    {className: 'md-pro', dangerouslySetInnerHTML: {__html: (0, h.markdown)(r, n)}},
                    void 0
                );
            }
            function C() {
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
                                    L,
                                    {
                                        config: {useWrapper: !1},
                                        mdInput:
                                            "### Example &lt;Audio/&gt;\r\n\r\n```javascript\r\nimport React from 'react';\r\nimport {AudioPlayerControlSprite, Audio} from 'react-audio-player-pro';\r\nimport reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';\r\n\r\nconst mediaMetadata = {\r\n\r\n    // required\r\n    title: 'Pure Water',\r\n\r\n    // optional\r\n    artist: 'Meydän',\r\n\r\n    // optional\r\n    album: 'Interplanetary Forest',\r\n\r\n    // optional\r\n    artwork: [\r\n\r\n        // src, sizes and type is required\r\n        {src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png'},\r\n        {src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png'},\r\n    ],\r\n};\r\n\r\nexport function ExampleAudio() {\r\n    return (\r\n        &lt;&gt;\r\n            &lt;AudioPlayerControlSprite/&gt;\r\n            &lt;Audio\r\n                // string - path to audio file, required\r\n                src=\"/path/to/audio/file\"\r\n\r\n                // MediaMetadata - media meta data\r\n                // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata\r\n                // optional\r\n                mediaMetadata={mediaMetadata}\r\n\r\n                // string - wrapper's class name, optional, deafult: ''\r\n                className=\"my-class-name\"\r\n\r\n                // callback function - called on did mount, optional, default: noop\r\n                onDidMount={console.log}\r\n\r\n                // string - name for download file, optional, deafult: &lt;src&gt;\r\n                downloadFileName=\"my-file.mp3\"\r\n\r\n                // boolean - show repeat button, optional, deafult: false\r\n                useRepeatButton={true}\r\n            /&gt;\r\n        &lt;/&gt;\r\n    );\r\n}\r\n```\r\n\r\n### Result:\r\n",
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(
                                    D.Audio,
                                    {mediaMetadata: t.mediaMetadata, src: t.src, useRepeatButton: !0},
                                    void 0
                                ),
                                (0, e.jsx)(D.AudioPlayerControlSprite, {}, void 0),
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
                    e('Build date:', '2021-10-30T21:02:09.299Z'),
                    e('Is production:', !0);
            })();
            const I = w + '/image-file/react-icon-64.png',
                Y = w + '/image-file/react-icon-128.png',
                R = w + '/image-file/react-icon-256.png',
                k = w + '/image-file/react-icon-512.png',
                z = [
                    {
                        mediaMetadata: {
                            album: 'Ability to Break ~ Energetic Tracks',
                            artist: 'J. Syreus Bach',
                            artwork: [
                                {sizes: '64x64', src: I, type: 'image/png'},
                                {sizes: '128x128', src: Y, type: 'image/png'},
                                {sizes: '256x256', src: R, type: 'image/png'},
                                {sizes: '512x512', src: k, type: 'image/png'},
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
                                {sizes: '64x64', src: I, type: 'image/png'},
                                {sizes: '128x128', src: Y, type: 'image/png'},
                                {sizes: '256x256', src: R, type: 'image/png'},
                                {sizes: '512x512', src: k, type: 'image/png'},
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
                                {sizes: '64x64', src: I, type: 'image/png'},
                                {sizes: '128x128', src: Y, type: 'image/png'},
                                {sizes: '256x256', src: R, type: 'image/png'},
                                {sizes: '512x512', src: k, type: 'image/png'},
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
                                {sizes: '64x64', src: I, type: 'image/png'},
                                {sizes: '128x128', src: Y, type: 'image/png'},
                                {sizes: '256x256', src: R, type: 'image/png'},
                                {sizes: '512x512', src: k, type: 'image/png'},
                            ],
                            title: 'Climb',
                        },
                        src: 'http://webbestmaster.github.io/react-audio-player-pro/audio-file/the-ghost-in-your-piano-climb.mp3',
                    },
                ];
            function W() {
                return (0, e.jsxs)(
                    'div',
                    Object.assign(
                        {className: 'example-wrapper'},
                        {
                            children: [
                                (0, e.jsx)(
                                    L,
                                    {
                                        config: {useWrapper: !1},
                                        mdInput:
                                            "### Example &lt;AudioPlayer/&gt;\r\n\r\n```javascript\r\nimport React from 'react';\r\nimport {AudioPlayerControlSprite, AudioPlayer, type TrackType} from 'react-audio-player-pro';\r\nimport reactAudioPlayerProStyle from 'react-audio-player-pro/dist/style.css';\r\n\r\nconst audioTrackList: Array&lt;TrackType&gt; = [\r\n    {\r\n        // string - path to audio file, required\r\n        src: '/path/to/audio/file',\r\n\r\n        // JSX.Element - custom content instead of title, optional, deafult: &lt;title&gt or &lt;src&gt\r\n        content: &lt;CustomContent/&gt;,\r\n\r\n        // MediaMetadata - media meta data, see `mediaMetadata` above\r\n        // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata\r\n        // optional\r\n        mediaMetadata: {\r\n            title: 'Lesser Faith',\r\n            artist: 'J. Syreus Bach',\r\n            album: 'Ability to Break ~ Energetic Tracks',\r\n            artwork: [\r\n                {src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png'},\r\n                {src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png'},\r\n            ],\r\n        },\r\n    },\r\n    // other tracks here...\r\n];\r\n\r\nexport function ExampleAudioPlayer() {\r\n    return (\r\n        &lt;&gt;\r\n            &lt;AudioPlayerControlSprite/&gt;\r\n            &lt;AudioPlayer\r\n                // Array&lt;TrackType&gt; - list of track, see `audioTrackList` above, required\r\n                trackList={audioTrackList}\r\n\r\n                // string - wrapper's class name, optional, deafult: ''\r\n                className=\"my-class-name\"\r\n\r\n                // callback function - called on did mount, optional, default: noop\r\n                onDidMount={console.log}\r\n\r\n                // default player state, optional\r\n                defaultState={{\r\n                    // boolean - is player muted, optional, default: false\r\n                    isMuted: false,\r\n\r\n                    // number - active song index, optional, default: 0\r\n                    activeIndex: 0,\r\n\r\n                    // boolean - is shuffle on, optional, default: false\r\n                    isShuffleOn: false,\r\n\r\n                    // boolean - is track list open, optional, default: true\r\n                    isTrackListOpen: true,\r\n\r\n                    // string: 'none' | 'all' | 'one' - repeating state, optional, default: 'none'\r\n                    repeatingState: 'none',\r\n                }}\r\n            /&gt;\r\n        &lt;/&gt;\r\n    );\r\n}\r\n```\r\n\r\n### Result:\r\n",
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(
                                    D.AudioPlayer,
                                    {
                                        defaultState: {
                                            activeIndex: 0,
                                            isMuted: !1,
                                            isShuffleOn: !1,
                                            isTrackListOpen: !0,
                                            repeatingState: 'none',
                                        },
                                        trackList: z,
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(D.AudioPlayerControlSprite, {}, void 0),
                            ],
                        }
                    ),
                    void 0
                );
            }
            const G = require('ajv'),
                H = new (n.n(G)())();
            function F(e, t) {
                const r = H.compile(t);
                if (r(e)) return e;
                throw new Error(JSON.stringify(r.errors));
            }
            var K;
            !(function (e) {
                (e.delete = 'DELETE'), (e.get = 'GET'), (e.patch = 'PATCH'), (e.post = 'POST'), (e.put = 'PUT');
            })(K || (K = {}));
            const q = {},
                V = 'undefined' != typeof window;
            function J(r) {
                const {children: n, fallback: i} = r;
                return V ? (0, e.jsx)(t.Suspense, Object.assign({fallback: i}, {children: n}), void 0) : i;
            }
            var X,
                $ = n(436);
            function Z() {
                return (
                    (Z =
                        Object.assign ||
                        function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = arguments[t];
                                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                            }
                            return e;
                        }),
                    Z.apply(this, arguments)
                );
            }
            function Q(e) {
                return t.createElement(
                    'svg',
                    Z({width: 32, height: 32, fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg'}, e),
                    X ||
                        (X = t.createElement('path', {
                            d: 'M16 .5C7.437.5.5 7.438.5 16c0 8.563 6.938 15.5 15.5 15.5 8.563 0 15.5-6.938 15.5-15.5C31.5 7.437 24.562.5 16 .5zm0 28C9.106 28.5 3.5 22.894 3.5 16S9.106 3.5 16 3.5 28.5 9.106 28.5 16 22.894 28.5 16 28.5zM11 15c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2-1.106 0-2 .894-2 2 0 1.106.894 2 2 2zm10 0c1.106 0 2-.894 2-2 0-1.106-.894-2-2-2-1.106 0-2 .894-2 2 0 1.106.894 2 2 2zm.25 4.538A6.82 6.82 0 0116 22a6.8 6.8 0 01-5.25-2.462 1.504 1.504 0 00-2.113-.194 1.504 1.504 0 00-.193 2.112A9.81 9.81 0 0016 24.994a9.81 9.81 0 007.556-3.538 1.498 1.498 0 00-.194-2.112 1.504 1.504 0 00-2.112.194z',
                        }))
                );
            }
            const ee = n.p + 'e2f0c34.svg',
                te = 'e4e05a',
                re = {additionalProperties: !1, properties: {ip: {type: 'string'}}, required: ['ip'], type: 'object'},
                ne = (0, t.lazy)(() => n.e(704).then(n.bind(n, 832)));
            function ie() {
                const {getLocalizedString: r, setLocaleName: n, localeName: i} = m(),
                    {getFormattedNumber: a} = (function () {
                        const {localeName: e} = m(),
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
                    {screenInfo: o} = (0, f.useSystem)(),
                    [s, c] = (0, t.useState)(!1),
                    [d, u] = (0, t.useState)(null);
                return (
                    setTimeout(() => {
                        c(!1);
                    }, 1e3),
                    (0, t.useEffect)(() => {
                        (async () => {
                            const e = await (async function (e, t, r) {
                                !(function (e) {
                                    const {method: t} = {};
                                    t &&
                                        t !== K.get &&
                                        Object.keys(q).forEach(e => {
                                            q[e] = null;
                                        });
                                })();
                                const n = `${e} - ${JSON.stringify('[empty]')}`,
                                    i = q[n];
                                if (i) return F(i, t);
                                Date.now();
                                try {
                                    const i = await fetch(e, r);
                                    if (!i.ok) throw new Error(await i.text());
                                    const a = F(await i.json(), t);
                                    return (q[n] = a), a;
                                } catch (e) {
                                    throw ((q[n] = null), console.error(e), e);
                                } finally {
                                    Date.now();
                                }
                            })('https://api.ipify.org?format=json', re);
                            u(e);
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
                                        {className: te},
                                        {children: ['home page (', (0, e.jsx)(M, {}, void 0), ')']}
                                    ),
                                    void 0
                                ),
                                (0, e.jsxs)(
                                    'h4',
                                    {children: ['your ip is: ', d ? d.ip : (0, e.jsx)(M, {}, void 0)]},
                                    void 0
                                ),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(
                                    'button',
                                    Object.assign(
                                        {
                                            'data-test-data': B({data: 'some-string'}),
                                            'data-test-id': U('language-button'),
                                            onClick: () => n(i === l.enUs ? l.ruRu : l.enUs),
                                            type: 'button',
                                        },
                                        {children: i}
                                    ),
                                    void 0
                                ),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(N.NavigationLink, Object.assign({to: S}, {children: 'to info'}), void 0),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(
                                    'code',
                                    {children: a(321, {style: 'unit', unit: 'liter', unitDisplay: 'long'})},
                                    void 0
                                ),
                                (0, e.jsx)('pre', {children: JSON.stringify(o, null, 4)}, void 0),
                                (0, e.jsx)(T, {stringKey: 'BUTTON__APPLY'}, void 0),
                                (0, e.jsx)('h4', {children: r('BUTTON__APPLY')}, void 0),
                                (0, e.jsx)('img', {alt: '', src: $}, void 0),
                                (0, e.jsx)('img', {alt: '', src: ee}, void 0),
                                (0, e.jsx)(Q, {}, void 0),
                                (0, e.jsx)(
                                    J,
                                    Object.assign(
                                        {fallback: (0, e.jsx)(A, {position: 'absolute'}, void 0)},
                                        {children: (0, e.jsx)(ne, {smth: 'smth'}, void 0)}
                                    ),
                                    void 0
                                ),
                                (0, e.jsx)(
                                    P,
                                    Object.assign(
                                        {textContent: 'Hello, World'},
                                        {children: (0, e.jsx)('p', {children: 'inner text'}, void 0)}
                                    ),
                                    void 0
                                ),
                                (0, e.jsx)('hr', {}, void 0),
                                (0, e.jsx)(C, {}, void 0),
                                (0, e.jsx)(W, {}, void 0),
                            ],
                        },
                        void 0
                    )
                );
            }
            function ae() {
                const {getLocalizedString: r} = m(),
                    [n, i] = (0, t.useState)(!1),
                    {screenInfo: a} = (0, f.useSystem)(),
                    {height: o, width: s} = (0, f.useScreenSize)(),
                    c = (0, f.useScreenWidth)(),
                    l = (0, f.useScreenHeight)();
                return (
                    (0, t.useEffect)(() => {}),
                    setTimeout(() => {
                        i(!1);
                    }, 1e3),
                    (0, e.jsxs)(
                        'div',
                        {
                            children: [
                                (0, e.jsx)('h1', Object.assign({className: te}, {children: 'info page'}), void 0),
                                (0, e.jsx)(N.NavigationLink, Object.assign({to: '/'}, {children: 'to home'}), void 0),
                                (0, e.jsx)('pre', {children: JSON.stringify(a, null, 4)}, void 0),
                                (0, e.jsx)(
                                    'pre',
                                    {
                                        children: JSON.stringify(
                                            {height: o, screenHeight: l, screenWidth: c, width: s},
                                            null,
                                            4
                                        ),
                                    },
                                    void 0
                                ),
                                (0, e.jsx)(T, {stringKey: 'BUTTON__APPLY'}, void 0),
                                (0, e.jsx)('h4', {children: r('BUTTON__APPLY')}, void 0),
                                (0, e.jsx)('img', {alt: '', src: $}, void 0),
                                (0, e.jsx)('img', {alt: '', src: ee}, void 0),
                                (0, e.jsx)(Q, {}, void 0),
                                (0, e.jsx)(A, {position: 'absolute'}, void 0),
                            ],
                        },
                        void 0
                    )
                );
            }
            function oe(t) {
                const {isRender: r, children: n} = t;
                return r ? (0, e.jsx)(e.Fragment, {children: n}, void 0) : null;
            }
            function se(t) {
                const {isHidden: r, children: n, className: i} = t,
                    a = y('c55e81', {e1b7a2: r}, i);
                return (0, e.jsx)('div', Object.assign({className: a}, {children: n}), void 0);
            }
            O()('# Markdown Pro'),
                O()('# Markdown Pro', {
                    parseLink: !0,
                    useLineBreak: !0,
                    useWrapper: !0,
                    wrapperClassName: 'my-markdown-pro',
                });
            const ce = n.p + 'acf93e3.svg';
            function le(r) {
                const {className: n, mainText: i, secondaryText: a} = r,
                    o = (0, t.useMemo)(
                        () =>
                            i
                                ? (0, e.jsx)(
                                      'h4',
                                      Object.assign(
                                          {className: 'c41eb1'},
                                          {children: (0, e.jsx)(T, {stringKey: i}, void 0)}
                                      ),
                                      void 0
                                  )
                                : null,
                        [i]
                    ),
                    s = (0, t.useMemo)(
                        () =>
                            a
                                ? (0, e.jsx)(
                                      'p',
                                      Object.assign(
                                          {className: 'd585be'},
                                          {children: (0, e.jsx)(T, {stringKey: a}, void 0)}
                                      ),
                                      void 0
                                  )
                                : null,
                        [a]
                    );
                return (0, e.jsxs)(
                    'div',
                    Object.assign(
                        {className: y('fcae9b', n)},
                        {children: [(0, e.jsx)('img', {alt: '', className: 'b64fa9', src: ce}, void 0), o, s]}
                    ),
                    void 0
                );
            }
            function de() {
                return (0, e.jsxs)(
                    'div',
                    {
                        children: [
                            (0, e.jsx)('h1', {children: 'Page 404'}, void 0),
                            (0, e.jsx)(
                                oe,
                                Object.assign(
                                    {isRender: !1},
                                    {
                                        children: (0, e.jsxs)(
                                            se,
                                            Object.assign(
                                                {isHidden: !1},
                                                {
                                                    children: [
                                                        (0, e.jsx)(
                                                            le,
                                                            {
                                                                mainText: 'EMPTY__THERE_IS_NOTHING_HERE_YET',
                                                                secondaryText: 'EMPTY__TRY_CHANGING_FILTERS',
                                                            },
                                                            void 0
                                                        ),
                                                        (0, e.jsx)(A, {position: 'static'}, void 0),
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
            function ue() {
                const t = (0, e.jsxs)(
                    E.Switch,
                    {
                        children: [
                            (0, e.jsx)(E.Route, {component: ie, exact: !0, path: '/'}, void 0),
                            (0, e.jsx)(E.Route, {component: ae, exact: !0, path: S}, void 0),
                            (0, e.jsx)(E.Route, {component: de}, void 0),
                        ],
                    },
                    void 0
                );
                return V
                    ? (0, e.jsx)(E.BrowserRouter, {children: t}, void 0)
                    : (0, e.jsx)(E.StaticRouter, {children: t}, void 0);
            }
            console.warn('server'),
                console.warn(
                    i().renderToStaticMarkup(
                        (0, e.jsx)(
                            function () {
                                return (0, e.jsx)(g, {children: (0, e.jsx)(ue, {}, void 0)}, void 0);
                            },
                            {},
                            void 0
                        )
                    )
                );
        })();
})();
