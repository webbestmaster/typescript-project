/* global File, FormData */

import {apiUrl} from '../../../server/const';
import {UploadFileResponseType} from '../../../server/file/file-type';
import {FetchMethodEnum, fetchX} from '../../util/fetch';
import {uploadFileResponseSchema} from '../../../server/file/file-validation';

export function uploadFile(file: File): Promise<UploadFileResponseType> {
    const formData = new FormData();

    formData.append('file', file);

    return fetchX<UploadFileResponseType>(apiUrl.adminFileUpload, uploadFileResponseSchema, {
        body: formData,
        credentials: 'include',
        method: FetchMethodEnum.post,
    });
}

export function getPathToImage(uniqueFileName: string, imageConfig: Record<'height' | 'width', number>): string {
    const {width, height} = imageConfig;

    return `${apiUrl.imageGet.replace(':fileName', uniqueFileName)}?${String(width)}x${String(height)}`;
}

export function getPathToFile(uniqueFileName: string): string {
    return apiUrl.fileGet.replace(':fileName', uniqueFileName);
}
