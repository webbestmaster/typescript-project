/* eslint-disable sort-keys */

export const appRoute = {
    // client
    root: {
        path: '/',
    },

    info: {
        path: '/info',
    },

    test: {
        path: '/test/use-deferred-value',
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
