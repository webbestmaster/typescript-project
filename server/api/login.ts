import {FastifyRequest, FastifyReply} from 'fastify';

import {findUserByCredentials} from '../auth/auth-data-base';
import {LoginResponseType} from '../../www/service/auth/auth-type';

export async function postLogin(request: FastifyRequest<{Body: string}>, reply: FastifyReply): Promise<void> {
    const {body} = request;

    const parsedData: Record<string, unknown> = JSON.parse(body);

    const {login, password} = parsedData;

    if (typeof login !== 'string' || typeof password !== 'string') {
        reply.code(400).send(null);
        return;
    }

    const user = await findUserByCredentials(login, password);

    if (!user) {
        reply.code(404).send(null);
        return;
    }

    const userForFront: LoginResponseType = {
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(userForFront);
}
