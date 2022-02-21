/* global process */

import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-process-env
export const sha256key: string = String(process.env.sha256key || '').trim();

(() => {
    if (sha256key === '') {
        throw new Error('[ERROR]: auth - sha256key is not define!');
    }
})();
