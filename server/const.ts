export const siteCookieKey = 'site-cookie';

export const apiUrl = {
    adminArticleCreate: '/api/admin/article/create',
    adminArticleDelete: '/api/admin/article/delete/:articleId' as const,
    adminArticleEdit: '/api/admin/article/edit',
    adminArticleUpdate: '/api/admin/article/update',
    adminFileUpload: '/api/admin/file/upload',
    articleListPagination: '/api/article/pagination',
    articleListPaginationPick: '/api/article/pagination-pick',
    clientArticleContextGet: '/api/client-article/:slug' as const,
    fileGet: '/static-file/:fileName' as const,
    getUser: '/api/auth/get-user',
    imageGet: '/api-image/:size/:fileName' as const,
    login: '/api/auth/login',
};

export const mainResponseHeader: [string, string] = ['Content-Type', 'application/json; charset=utf-8'];
