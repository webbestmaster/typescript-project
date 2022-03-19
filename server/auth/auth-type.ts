import {UserRoleEnum} from '../../www/provider/user/user-context-type';

export type AuthUserType = {
    id: string;
    login: string;
    password: string;
    role: UserRoleEnum;
};
