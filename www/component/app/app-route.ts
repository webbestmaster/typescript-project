/* eslint-disable sort-keys */

export const appRoute = {
    // client
    root: {
        path: '/',
    },

    info: {
        path: '/info',
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
