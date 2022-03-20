import {makeCrud} from '../data-base/data-base';

import {AuthUserType} from './auth-type';
import {authUserSchema} from './auth-validation';

export const authCrud = makeCrud<AuthUserType>('auth.user', authUserSchema);
