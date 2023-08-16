import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {apiUrl} from '../../../server/const';

import type {LoginResponseType} from './auth-type';
import {loginResponseSchema} from './auth-const';

export async function loginUser(login: string, password: string): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.login, loginResponseSchema, {
        body: JSON.stringify({login, password}),
        method: FetchMethodEnum.post,
    });
}

export async function getAutoAuthLogin(): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.getUser, loginResponseSchema, {
        credentials: 'include',
        method: FetchMethodEnum.get,
    });
}
