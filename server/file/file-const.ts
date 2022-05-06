/* global process */

import path from 'path';

const cwd = process.cwd();

export const uploadFolder = path.join(cwd, 'upload-file');
