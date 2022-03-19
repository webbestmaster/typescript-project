import Ajv, {JSONSchemaType} from 'ajv';

const ajv = new Ajv();

import {UserRoleEnum} from '../../www/provider/user/user-context-type';

import {AuthUserType} from './auth-type';

export const authUserSchema: JSONSchemaType<AuthUserType> = {
    additionalProperties: false,
    properties: {
        id: {type: 'string'},
        login: {type: 'string'},
        password: {type: 'string'},
        role: {'enum': Object.values(UserRoleEnum), type: 'string'},
    },
    required: ['id', 'login', 'password', 'role'],
    type: 'object',
} as const;

export const authUserSchemaValidate = ajv.compile<AuthUserType>(authUserSchema);
