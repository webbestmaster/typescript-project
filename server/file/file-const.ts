/* global process */

import path from 'path';

const cwd = process.cwd();

export const uploadFileFolder = 'static-file';

export const uploadFolder = path.join(cwd, uploadFileFolder);
