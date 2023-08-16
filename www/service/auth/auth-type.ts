import type {UserRoleEnum} from '../../provider/user/user-context-type';

export interface LoginResponseType {
    user: {
        id: string;
        login: string;
        role: UserRoleEnum;
    };
}
