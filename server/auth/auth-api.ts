import {FastifyRequest, FastifyReply} from 'fastify';

import {LoginResponseType} from '../../www/service/auth/auth-type';
import {getSha256Hash} from '../util/string';

import {authCrud} from './auth';
import {cookieFieldUserId} from './auth-const';

export async function postAuthLogin(request: FastifyRequest<{Body: string}>, reply: FastifyReply): Promise<void> {
    const {body, session} = request;

    const parsedData: Record<string, unknown> = JSON.parse(body);

    const {login, password} = parsedData;

    // console.log(session.get('data'))
    //
    // session.set('data', '12312312312321313');
    // session.options({maxAge: 1000 * 60 * 60});

    if (typeof login !== 'string' || typeof password !== 'string') {
        reply.code(400).send(null);
        return;
    }

    const user = await authCrud.findOne({login, password: getSha256Hash(password)});

    if (!user) {
        reply.code(400).send(null);
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

    reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(loginResponse);
}
