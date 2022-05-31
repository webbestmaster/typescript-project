import {UserRoleEnum} from '../../www/provider/user/user-context-type';

export type AuthUserType = {
    _id?: string;
    id: string;
    login: string;
    password: string;
    role: UserRoleEnum;
};
