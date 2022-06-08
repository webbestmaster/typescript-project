import {FastifyReply, FastifyRequest} from 'fastify';

import {LoginResponseType} from '../../www/service/auth/auth-type';
import {getSha256HashServer} from '../util/string';
import {UserRoleEnum} from '../../www/provider/user/user-context-type';
import {mainResponseHeader} from '../const';

import {authCrud} from './auth';
import {cookieFieldUserId} from './auth-const';

export async function postAuthLogin(request: FastifyRequest<{Body?: string}>, reply: FastifyReply): Promise<void> {
    const {body, session} = request;

    const parsedData: Record<string, unknown> = JSON.parse(String(body || '{}'));

    const {login, password} = parsedData;

    if (typeof login !== 'string' || typeof password !== 'string') {
        reply.code(400).send(null);
        return;
    }

    const user = await authCrud.findOne({login, password: getSha256HashServer(password)});

    if (!user) {
        reply.code(400).send(null);
        return;
    }

    session.set(cookieFieldUserId, user.id);
    session.options({maxAge: 1000 * 60 * 60});

    const loginResponse: LoginResponseType = {
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    reply
        .code(200)
        .header(...mainResponseHeader)
        .send(loginResponse);
}

export async function getAutoAuthLogin(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const defaultLoginResponse: LoginResponseType = {user: {id: '', login: '', role: UserRoleEnum.user}};
    const {session} = request;
    const userId = String(session.get(cookieFieldUserId) || '');

    if (!userId) {
        reply
            .code(200)
            .header(...mainResponseHeader)
            .send(defaultLoginResponse);
        return;
    }

    const user = await authCrud.findOne({id: userId});

    if (!user) {
        reply
            .code(200)
            .header(...mainResponseHeader)
            .send(defaultLoginResponse);
        return;
    }

    const loginResponse: LoginResponseType = {
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    session.set(cookieFieldUserId, user.id);
    session.options({maxAge: 1000 * 60 * 60});

    reply
        .code(200)
        .header(...mainResponseHeader)
        .send(loginResponse);
}
