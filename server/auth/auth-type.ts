import {UserRoleEnum} from '../../www/provider/user/user-context-type';

export type AuthUserType = {
    id: string;
    login: string;
    role: UserRoleEnum;
};

export type AuthUserFullType = AuthUserType & {password: string};
