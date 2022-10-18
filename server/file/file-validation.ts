import Ajv, {JSONSchemaType, ValidateFunction} from 'ajv';

import {makeArticleFileSchema} from '../article/article-validation';

import {UploadFileResponseType} from './file-type';

export const uploadFileResponseSchema: JSONSchemaType<UploadFileResponseType> = makeArticleFileSchema();

export function validateUploadFileResponse(data: unknown): [boolean, ValidateFunction<UploadFileResponseType>] {
    const ajv = new Ajv();
    const modelJsonSchemaValidate = ajv.compile<UploadFileResponseType>(uploadFileResponseSchema);

    const isValidArticle = modelJsonSchemaValidate(data);

    return [isValidArticle, modelJsonSchemaValidate];
}
