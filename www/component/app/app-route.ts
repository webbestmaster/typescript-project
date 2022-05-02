/* eslint-disable sort-keys */

export type AppRoutType = {
    path: string;
};

export const appRoute: Record<string, AppRoutType> = {
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
        path: '/cms/article-edit/:articleId' as const, // `as const` is required for TS validation of useParams and generatePath of react-router-dom
    },

    // service
    login: {
        path: '/login',
    },
} as const;
