/* global process */

import path from 'path';

const cwd = process.cwd();

export const uploadFileFolder = 'upload-folder';

export const uploadFolder = path.join(cwd, uploadFileFolder);
