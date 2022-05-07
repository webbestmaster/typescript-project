export const siteCookieKey = 'site-cookie';

export const apiUrl = {
    articleListPagination: '/api/article/list-pagination',
    fileGet: '/api/get-file/:fileName' as const,
    fileUpload: '/api/upload-file',
    getUser: '/api/auth/get-user',
    login: '/api/auth/login',
} as const;

export const mainResponseHeader: [string, string] = ['Content-Type', 'application/json; charset=utf-8'];
