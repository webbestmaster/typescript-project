export const siteCookieKey = 'site-cookie';

export const apiUrl = {
    adminArticleCreate: '/api/admin/article/create',
    adminArticleDelete: '/api/admin/article/delete/:articleId' as const,
    adminArticleEdit: '/api/admin/article/edit',
    adminArticleListPagination: '/api/admin/article/pagination',
    adminArticleListPaginationPick: '/api/admin/article/pagination-pick',
    adminArticleUpdate: '/api/admin/article/update',
    adminFileUpload: '/api/admin/file/upload',
    clientArticleContextGet: '/api/client-article/:slug' as const,
    clientMakePdf: '/api/client-make-pdf',
    clientSearchArticle: '/api/client-article/pagination-pick',
    fileGet: '/static-file/:fileName' as const,
    getUser: '/api/auth/get-user',
    imageGet: '/api-image/:size/:fileName' as const,
    login: '/api/auth/login',

    makeStatic: '/make-static',
};

export const mainResponseHeader: [string, string] = ['Content-Type', 'application/json; charset=utf-8'];
