/* global Buffer, process */

import path from 'path';

// remove '@fastify/static' from package.json
import fastifyStaticServer from '@fastify/static';
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
    getClientArticleContextData,
    getArticleClientListPaginationPick,
} from './article/article-api';
import {getFile, uploadFile} from './file/file';
import {adminOnly} from './auth/auth-helper';
import {indexHtmlError500} from './ssr/ssr-const';
import {makeCacheFile} from './article/article-cache';
import {getPdf} from './pdf/pdf';

const cwd = process.cwd();

const serverPort = 3000;

// eslint-disable-next-line max-statements
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

    fastify.register(fastifyStaticServer, {
        prefix: '/', // optional: default '/'
        root: path.join(cwd, 'dist'),
        setHeaders: (response: {setHeader: (header: string, value: string) => void}) => {
            console.info('[ERROR] using fastifyStaticServer');
            response.setHeader('x-warning-get-file', 'need-use-nginx');
        },
    });

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
    fastify.get(apiUrl.adminArticleListPagination, adminOnly(getArticleListPagination));
    fastify.get(apiUrl.adminArticleListPaginationPick, adminOnly(getArticleListPaginationPick));
    fastify.post(apiUrl.adminFileUpload, adminOnly(uploadFile));
    fastify.get(apiUrl.fileGet, getFile);
    fastify.get(apiUrl.imageGet, getFile);
    fastify.get(apiUrl.clientArticleContextGet, getClientArticleContextData);
    fastify.get(apiUrl.clientSearchArticle, getArticleClientListPaginationPick);
    fastify.post(apiUrl.clientMakePdf, getPdf);
    fastify.post(apiUrl.adminArticleCreate, adminOnly(postAdminArticleCreate));
    fastify.post(apiUrl.adminArticleUpdate, adminOnly(postAdminArticleUpdate));
    fastify.delete(apiUrl.adminArticleDelete, adminOnly(deleteAdminArticleDelete));

    // //////////////
    // Pages
    // //////////////
    Object.values(appRoute).forEach((rout: AppRoutType) => {
        fastify.get(
            rout.path,
            // eslint-disable-next-line complexity
            async (request: FastifyRequest<{Params: {slug?: string}}>, reply: FastifyReply): Promise<string> => {
                const [ssrResponse, article] = await getHtmlCallBack(request, reply);

                if (article.slug) {
                    makeCacheFile(article.slug, ssrResponse).catch(console.error);
                }

                reply.header('X-file-generated', 'use-nginx');

                return ssrResponse;
            }
        );
    });

    // //////////////
    // 4xx & 5xx
    // //////////////
    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        request.log.warn(error);

        reply.code(500).type('text/html').send(indexHtmlError500);
    });

    fastify.setNotFoundHandler(
        async (request: FastifyRequest<{Params: {slug?: string}}>, reply: FastifyReply): Promise<string> => {
            request.log.warn(request);

            reply.code(404);

            const [html] = await getHtmlCallBack(request, reply);

            return html;
        }
    );

    await fastify.listen({port: serverPort});

    console.log(`> Server started port: ${serverPort}`);

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
