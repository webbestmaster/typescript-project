/* eslint-disable sort-keys */

export const appRoute = {
    // client
    root: {
        path: '/',
    },

    info: {
        path: '/info',
    },

    testUseDeferredValue: {
        path: '/test/use-deferred-value',
    },

    testUseDeferredValueSecond: {
        path: '/test/use-deferred-value-second',
    },

    // cms
    articleList: {
        path: '/cms/article-list',
    },

    // service
    login: {
        path: '/login',
    },
} as const;
