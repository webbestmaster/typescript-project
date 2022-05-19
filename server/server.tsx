/* global Buffer */

// import path from 'path';

// remove '@fastify/static' from package.json
// import fastifyStaticServer from '@fastify/static';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifySecureSession from '@fastify/secure-session';
import {FastifyError} from '@fastify/error';
import fastifyConstructor, {FastifyRequest, FastifyReply} from 'fastify';

import {appRoute, AppRoutType} from '../www/component/app/app-route';

import {getAutoAuthLogin, postAuthLogin} from './auth/auth-api';
import {getHtmlCallBack} from './ssr/ssr';
import {secretKey} from './key';
import {apiUrl, siteCookieKey} from './const';
import {
    getArticleListPagination,
    getArticleListPaginationPick,
    postAdminArticleCreate,
    deleteAdminArticleDelete,
    postAdminArticleUpdate,
} from './article/article-api';
import {getFile, uploadFile} from './file/file';
import {adminOnly} from './auth/auth-helper';

// const cwd = process.cwd();

const serverPort = 3000;

(async () => {
    const fastify = fastifyConstructor({logger: false});

    // //////////////
    // Services
    // //////////////
    fastify.register(fastifyCors);
    fastify.register(fastifyMultipart);

    /*
        fastify.register(fastifyStaticServer, {
            prefix: '/upload-file', // optional: default '/'
            root: path.join(cwd, 'upload-file'),
        });
    */

    /*
    fastify.register(fastifyStaticServer, {
        prefix: '/', // optional: default '/'
        root: path.join(cwd, 'dist'),
        /!*
        allowedPath: (pathName: string, root?: string | undefined): boolean => {
            console.log(pathName)
            return true;
        }
*!/
    });
*/

    /*
        fastify.register(fastifyStaticServer, {
            prefix: '/upload-file/', // optional: default '/'
            root: path.join(cwd, 'upload-file'),
        });
    */

    // options for setCookie, see https://github.com/fastify/fastify-cookie
    fastify.register(fastifySecureSession, {
        // the name of the session cookie, defaults to 'session'
        cookie: {
            httpOnly: true, // Use httpOnly for all production purposes
            path: '/',
        },
        cookieName: siteCookieKey,
        // adapt this to point to the directory where secret-key is located
        key: Buffer.from(secretKey, 'base64').slice(0, 32),
    });

    // //////////////
    // API
    // //////////////
    fastify.post(apiUrl.login, postAuthLogin);
    fastify.get(apiUrl.getUser, getAutoAuthLogin);
    fastify.get(apiUrl.articleListPagination, getArticleListPagination);
    fastify.get(apiUrl.articleListPaginationPick, getArticleListPaginationPick);
    fastify.post(apiUrl.adminFileUpload, adminOnly(uploadFile));
    fastify.get(apiUrl.fileGet, getFile);
    fastify.get(apiUrl.imageGet, getFile);
    fastify.post(apiUrl.adminArticleCreate, adminOnly(postAdminArticleCreate));
    fastify.post(apiUrl.adminArticleUpdate, adminOnly(postAdminArticleUpdate));
    fastify.delete(apiUrl.adminArticleDelete, adminOnly(deleteAdminArticleDelete));

    // //////////////
    // Pages
    // //////////////
    Object.values(appRoute).forEach((rout: AppRoutType) => {
        fastify.get(rout.path, getHtmlCallBack);
    });

    // //////////////
    // 4xx & 5xx
    // //////////////
    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        // TODO: maybe use here getHtmlCallBack to show error
        request.log.warn(error);

        const {statusCode = 500, message} = error;

        reply
            .code(statusCode)
            .type('text/plain')
            .send(statusCode >= 500 ? 'Custom Internal server error' : message);
    });

    fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
        request.log.warn(request);

        reply.code(404).type('text/plain').send('The page not found');
    });

    await fastify.listen(serverPort);

    // fastify.post('/', (request: FastifyRequest, reply: FastifyReply) => {
    //     request.session.set('data', request.body);
    //     reply.send('hello world');
    // });

    // fastify.get('/set-cookie', (request: FastifyRequest, reply: FastifyReply) => {
    //     console.log('/////////');
    //     console.log('set cookie 1');
    //     console.log(request.session.get('data'));
    //
    //     // reply.setCookie('session', 'value', { secure: false }) // this will not be used
    //
    //     request.session.set('data', '12312312312321313');
    //     request.session.options({maxAge: 1000 * 60 * 60});
    //     console.log('set cookie 2');
    //
    //     reply.send('hello world');
    // });
})();
