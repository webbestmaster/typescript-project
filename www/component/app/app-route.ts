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

    // cms
    articleCreate: {
        path: '/cms/article-create',
    },

    // cms
    articleEdit: {
        path: '/cms/article-edit/:articleId' as const, // TODO: see in RocketData how check articleId
    },

    // service
    login: {
        path: '/login',
    },
} as const;
