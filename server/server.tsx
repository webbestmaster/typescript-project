/* global Buffer, process */

import path from 'path';

import {fastifyCors} from '@fastify/cors';
import {fastifyStatic} from '@fastify/static';
import fastifyCompress from '@fastify/compress';
import {fastifyMultipart} from '@fastify/multipart';
import fastifySecureSession from '@fastify/secure-session';
import {FastifyError} from '@fastify/error';
import fastifyConstructor, {FastifyRequest, FastifyReply} from 'fastify';

import {appRoute, AppRoutType} from '../www/component/app/app-route';

import {getAutoAuthLogin, postAuthLogin} from './auth/auth-api';
import {getHtmlCallBack} from './ssr/ssr';
import {secretKey} from './key';
import {apiUrl, serverPort, siteCookieKey} from './const';
import {
    getArticleListPagination,
    getArticleListPaginationPick,
    postAdminArticleCreate,
    deleteAdminArticleDelete,
    postAdminArticleUpdate,
    getClientArticleContextData,
    getArticleClientListPaginationPick,
} from './article/article-api';
import {getImage, uploadFile} from './file/file';
import {adminOnly} from './auth/auth-helper';
import {indexHtmlError500} from './ssr/ssr-const';
import {makeCacheFile} from './article/article-cache';
import {getPdf} from './pdf/pdf';
import {PaginationResultType} from './data-base/data-base-type';
import {ArticleFileType, ArticleType} from './article/article-type';
import {makeStatic} from './make-static';
import {uploadFileFolder, uploadFolder} from './file/file-const';
import {rootArticleSlug} from './article/article-const';

const cwd = process.cwd();
// eslint-disable-next-line no-process-env
const isMakeStaticSite = process.env.MAKE_STATIC_SITE === 'TRUE';

// eslint-disable-next-line max-statements, unicorn/prefer-top-level-await
(async () => {
    const fastify = fastifyConstructor({logger: false});

    // //////////////
    // Services
    // //////////////
    fastify.register(fastifyCors);
    fastify.register(fastifyCompress);
    fastify.register(fastifyMultipart);

    // first of two fastifyStaticServer plugin
    fastify.register(fastifyStatic, {
        prefix: `/${uploadFileFolder}/`,
        root: uploadFolder,
        setHeaders: (response: {setHeader: (header: string, value: string) => void}) => {
            console.info('[ERROR] using fastifyStaticServer: upload foles');
            response.setHeader('x-warning-get-file', 'need-use-nginx');
        },
    });

    // second of two fastifyStaticServer plugin
    fastify.register(fastifyStatic, {
        decorateReply: false, // the reply decorator has been added by the first plugin registration
        prefix: '/', // optional: default '/'
        root: path.join(cwd, 'dist'),
        setHeaders: (response: {setHeader: (header: string, value: string) => void}) => {
            console.info('[ERROR] using fastifyStaticServer: html, css...');
            response.setHeader('x-warning-get-file', 'need-use-nginx');
        },
    });

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
    fastify.get(
        apiUrl.adminArticleListPagination,
        adminOnly<PaginationResultType<ArticleType>>(getArticleListPagination)
    );
    fastify.get(
        apiUrl.adminArticleListPaginationPick,
        adminOnly<PaginationResultType<Partial<ArticleType>>>(getArticleListPaginationPick)
    );
    fastify.post(apiUrl.adminFileUpload, adminOnly<ArticleFileType>(uploadFile));
    fastify.get(apiUrl.imageGet, getImage);
    fastify.get(apiUrl.clientArticleContextGet, getClientArticleContextData);
    fastify.get(apiUrl.clientSearchArticle, getArticleClientListPaginationPick);
    fastify.post(apiUrl.clientMakePdf, getPdf);
    fastify.post(apiUrl.adminArticleCreate, adminOnly<ArticleType | Record<'message', string>>(postAdminArticleCreate));
    fastify.post(apiUrl.adminArticleUpdate, adminOnly<ArticleType | Record<'message', string>>(postAdminArticleUpdate));
    fastify.delete(apiUrl.adminArticleDelete, adminOnly<Record<'articleId', string>>(deleteAdminArticleDelete));

    // //////////////
    // Pages
    // //////////////
    Object.values(appRoute).forEach((rout: AppRoutType) => {
        fastify.get(
            rout.path,
            async (request: FastifyRequest<{Params: {slug?: string}}>, reply: FastifyReply): Promise<string> => {
                const {article, html} = await getHtmlCallBack(
                    {
                        ...request,
                        params: {
                            ...request.params,
                            slug: (rout.path === appRoute.root.path ? rootArticleSlug : request.params.slug) || '',
                        },
                    },
                    reply
                );

                if (article.slug) {
                    makeCacheFile(article.slug, html).catch(console.error);
                }

                reply.header('X-file-generated', 'use-nginx');

                return html;
            }
        );
    });

    // //////////////
    // 4xx & 5xx
    // //////////////
    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply): string => {
        request.log.warn(error);

        reply.code(500).type('text/html');

        return indexHtmlError500;
    });

    fastify.setNotFoundHandler(
        async (request: FastifyRequest<{Params: {slug?: string}}>, reply: FastifyReply): Promise<string> => {
            request.log.warn(request);

            reply.code(404);

            const {html} = await getHtmlCallBack(request, reply);

            return html;
        }
    );

    fastify.listen({host: '0.0.0.0', port: serverPort}, async (error: Error | null): Promise<void> => {
        if (error) {
            console.log(error);
            throw error;
        }

        console.info(`> Server started port: ${serverPort}`);

        if (isMakeStaticSite) {
            await makeStatic();
            await fastify.close();
            console.info(`> Server on port: ${serverPort} has been closed`);
        }
    });

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
