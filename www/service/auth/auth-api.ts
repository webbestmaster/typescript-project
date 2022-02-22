import {FetchMethodEnum, fetchX} from '../../util/fetch';

import {LoginResponseType} from './auth-type';
import {loginResponseSchema} from './auth-const';

export function loginUser(login: string, password: string): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>('http://localhost:3000/api/login', loginResponseSchema, {
        body: JSON.stringify({login, password}),
        method: FetchMethodEnum.post,
    });
}
