/* global process, Buffer */

import path from 'path';

import fastifyStatic from 'fastify-static';
import fastifyCors from 'fastify-cors';
import fastifySecureSession from 'fastify-secure-session';
import fastifyConstructor, {FastifyRequest, FastifyReply} from 'fastify';
import {FastifyError} from 'fastify-error';

import {initializeUserDataBase} from './auth/auth-data-base';
import {postLogin} from './api/login';
import {getHtmlCallBack} from './ssr/ssr';
import {secretKey} from './auth/auth-key';

const cwd = process.cwd();

const serverPort = 3000;

(async () => {
    initializeUserDataBase();

    const fastify = fastifyConstructor({logger: false});

    fastify.register(fastifyCors);

    fastify.register(fastifyStatic, {
        prefix: '/', // optional: default '/'
        root: path.join(cwd, 'dist'),
    });

    // options for setCookie, see https://github.com/fastify/fastify-cookie
    fastify.register(fastifySecureSession, {
        // the name of the session cookie, defaults to 'session'
        cookie: {
            httpOnly: true, // Use httpOnly for all production purposes
            path: '/',
        },
        cookieName: 'site-cookie',
        // adapt this to point to the directory where secret-key is located
        key: Buffer.from(secretKey, 'base64').slice(0, 32),
    });

    fastify.get('/', getHtmlCallBack);
    fastify.get('/login', getHtmlCallBack);

    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        request.log.warn(error);

        const {statusCode = 500, message} = error;

        // const endStatusCode = statusCode >= 400 ? statusCode : 500

        reply
            .code(statusCode)
            .type('text/plain')
            .send(statusCode >= 500 ? 'Custom Internal server error' : message);
    });

    fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
        reply.code(404).type('text/plain').send('a custom not found');
    });

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

    fastify.post('/api/login', postLogin);

    await fastify.listen(serverPort);
})();
