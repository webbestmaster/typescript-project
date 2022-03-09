import {FastifyRequest, FastifyReply} from 'fastify';

import {LoginResponseType} from '../../www/service/auth/auth-type';
import {UserRoleEnum, UserType} from '../../www/provider/user/user-context-type';

export async function postLogin(request: FastifyRequest<{Body: string}>, reply: FastifyReply): Promise<void> {
    const {
        body,
        // session
    } = request;

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

    const user: UserType = {
        id: 'user.id',
        login: 'user.login',
        role: UserRoleEnum.user,
    };

    // const user = await findUserByCredentials(login, password);

    /*
    if (!user) {
        reply.code(404).send(null);
        return;
    }
*/

    const userForFront: LoginResponseType = {
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(userForFront);
}
