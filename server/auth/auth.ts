import {makeCrud} from '../data-base/data-base';
import {CrudConfigOnChangeArgumentType} from '../data-base/data-base-type';

import {AuthUserType} from './auth-type';
import {authUserSchema} from './auth-validation';

export const authCrud = makeCrud<AuthUserType>(
    {
        dataBaseId: 'auth.user',
        onChange: (data: CrudConfigOnChangeArgumentType) => {
            console.log('update DB');
            console.log('update sitemap.xml');
            console.log('update sitemap-img.xml');
            console.log(JSON.stringify(data));

            return Promise.resolve();
        },
    },
    authUserSchema
);

/*
authCrud.createOne({
    id: 'some-user-id',
    login: 'the-admin',
    password: getSha256Hash('123456'),
    role: UserRoleEnum.admin,
});
*/
