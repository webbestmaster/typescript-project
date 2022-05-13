export const siteCookieKey = 'site-cookie';

export const apiUrl = {
    adminArticleCreate: '/api/admin/article/create',
    adminArticleEdit: '/api/admin/article/edit',
    adminArticleUpdate: '/api/admin/article/update',
    adminFileUpload: '/api/admin/file/upload',
    articleListPagination: '/api/article/pagination',
    articleListPaginationPick: '/api/article/pagination-pick',
    fileGet: '/api/file/get/:fileName' as const,
    getUser: '/api/auth/get-user',
    login: '/api/auth/login',
};

export const mainResponseHeader: [string, string] = ['Content-Type', 'application/json; charset=utf-8'];
