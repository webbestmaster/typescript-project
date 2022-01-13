import {noop} from '../../util/function';

import {UserContextType, UserRoleEnum} from './user-context-type';

export const defaultUserContext: UserContextType = {
    setUser: noop,
    user: {
        id: '',
        role: UserRoleEnum.guest,
    },
};
