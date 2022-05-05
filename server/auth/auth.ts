import {makeCrud} from '../data-base/data-base';

import {AuthUserType} from './auth-type';
import {authUserSchema} from './auth-validation';
import {makeDefaultAuthUser} from './auth-helper';

export const authCrud = makeCrud<AuthUserType>('auth.user', authUserSchema, makeDefaultAuthUser);

/*
authCrud.createOne({
    id: 'some-user-id',
    login: 'the-admin',
    password: getSha256Hash('123456'),
    role: UserRoleEnum.admin,
});
*/
