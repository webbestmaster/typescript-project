import {UserRoleEnum} from '../../provider/user/user-context-type';

export type LoginResponseType = {
    user: {
        id: string;
        role: UserRoleEnum;
    };
};
