import {JSONSchemaType} from 'ajv';

import {LoginResponseType} from './auth-type';

export const loginResponseSchema: JSONSchemaType<LoginResponseType> = {
    // additionalProperties: false,
    properties: {
        user: {
            properties: {
                id: {type: 'string'},
                role: {type: 'string'},
            },
            required: ['id', 'role'],
            type: 'object',
        },
    },
    required: ['user'],
    type: 'object',
};
