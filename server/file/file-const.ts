import {cwd} from 'node:process';
import path from 'node:path';

export const uploadFileFolder = 'static-file';
export const temporaryUploadFileFolder = 'static-file-temp';

export const uploadFolder = path.join(cwd(), uploadFileFolder);
export const temporaryUploadFolder = path.join(cwd(), temporaryUploadFileFolder);
