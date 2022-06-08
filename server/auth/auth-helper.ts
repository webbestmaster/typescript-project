import {FastifyReply, FastifyRequest} from 'fastify';

import {UserRoleEnum} from '../../www/provider/user/user-context-type';
import {mainResponseHeader} from '../const';

import {authCrud} from './auth';
import {cookieFieldUserId} from './auth-const';
import {AuthUserType} from './auth-type';

export function makeDefaultAuthUser(): AuthUserType {
    const defaultUserData: AuthUserType = {
        id: '',
        login: '',
        password: '',
        role: UserRoleEnum.user,
    };

    return defaultUserData;
}

async function getIsAdmin(request: FastifyRequest): Promise<boolean> {
    const {session} = request;

    const user = await authCrud.findOne({id: String(session.get(cookieFieldUserId) || '')});

    return Boolean(user && user.role === UserRoleEnum.admin);
}

async function getIsNotAdmin(request: FastifyRequest): Promise<boolean> {
    const isAdmin = await getIsAdmin(request);

    return !isAdmin;
}

type AdminOnlyWrapperType = (
    request: FastifyRequest<{Body?: string; Params: {articleId?: string}}>,
    reply: FastifyReply
) => Promise<void>;

export function adminOnly(callBack: AdminOnlyWrapperType): AdminOnlyWrapperType {
    return async (
        request: FastifyRequest<{Body?: string; Params: {articleId?: string}}>,
        reply: FastifyReply
    ): Promise<void> => {
        if (await getIsNotAdmin(request)) {
            reply
                .code(403)
                .header(...mainResponseHeader)
                .send(null);
            // eslint-disable-next-line no-undefined
            return undefined;
        }

        return callBack(request, reply);
    };
}
