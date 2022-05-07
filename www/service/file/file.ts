/* global File, FormData */

import {apiUrl} from '../../../server/const';
import {UploadFileResponseType} from '../../../server/file/file-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {uploadFileResponseSchema} from '../../../server/file/file-validation';

export function uploadFile(file: File): Promise<UploadFileResponseType> {
    const formData = new FormData();

    formData.append('file', file);

    return fetchX<UploadFileResponseType>(apiUrl.fileUpload, uploadFileResponseSchema, {
        body: formData,
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}

export function getPathToImage(uniqueFileName: string): string {
    return apiUrl.fileGet.replace(':fileName', uniqueFileName);
}
