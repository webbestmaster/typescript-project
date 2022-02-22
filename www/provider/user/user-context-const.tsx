import {noop} from '../../util/function';

import {UserContextType, UserRoleEnum} from './user-context-type';

export const defaultUserContext: UserContextType = {
    setUser: noop,
    user: {
        id: '',
        login: '',
        role: UserRoleEnum.user,
    },
};
