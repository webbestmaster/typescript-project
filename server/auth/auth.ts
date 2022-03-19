import {makeCrud} from '../data-base/data-base';

import {AuthUserType} from './auth-type';

export const userCrud = makeCrud<AuthUserType>('user');
