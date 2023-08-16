import type {UserRoleEnum} from '../../www/provider/user/user-context-type';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthUserType = {
    // eslint-disable-next-line id-match
    _id?: string;
    id: string;
    login: string;
    password: string;
    role: UserRoleEnum;
};
