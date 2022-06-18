import Ajv, {JSONSchemaType, ValidateFunction} from 'ajv';

import {UploadFileResponseType} from './file-type';

const uploadFileResponseSchemaProperties = {
    uniqueFileName: {type: 'string'},
} as const;

const requiredFieldList: Array<keyof UploadFileResponseType> = ['uniqueFileName'];

export const uploadFileResponseSchema: JSONSchemaType<UploadFileResponseType> = {
    additionalProperties: false,
    properties: uploadFileResponseSchemaProperties,
    required: requiredFieldList,
    type: 'object',
};

export function validateUploadFileResponse(data: unknown): [boolean, ValidateFunction<UploadFileResponseType>] {
    const ajv = new Ajv();
    const modelJsonSchemaValidate = ajv.compile<UploadFileResponseType>(uploadFileResponseSchema);

    const isValidArticle = modelJsonSchemaValidate(data);

    return [isValidArticle, modelJsonSchemaValidate];
}
