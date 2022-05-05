import {FastifyRequest} from 'fastify';

import {UserRoleEnum} from '../../www/provider/user/user-context-type';

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

export async function getIsAdmin(request: FastifyRequest<{Body: string}>): Promise<boolean> {
    const {session} = request;

    const user = await authCrud.findOne({id: String(session.get(cookieFieldUserId) || '')});

    return Boolean(user && user.role === UserRoleEnum.admin);
}

export async function getIsNotAdmin(request: FastifyRequest<{Body: string}>): Promise<boolean> {
    const isAdmin = await getIsAdmin(request);

    return !isAdmin;
}
