export const siteCookieKey = 'site-cookie';

export const apiUrl = {
    adminArticleCreate: '/api/admin/article/create',
    adminArticleEdit: '/api/admin/article/edit',
    adminArticleListPagination: '/api/admin/article/pagination',
    adminArticleListPaginationPick: '/api/admin/article/pagination-pick',
    adminFileUpload: '/api/admin/file/upload',
    fileGet: '/api/file/get/:fileName' as const,
    getUser: '/api/auth/get-user',
    login: '/api/auth/login',
} as const;

export const mainResponseHeader: [string, string] = ['Content-Type', 'application/json; charset=utf-8'];
