/* global process */

import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line no-process-env
export const sha256key: string = String(process.env.SHA_256_KEY || '').trim();
// eslint-disable-next-line no-process-env
export const secretKey: string = String(process.env.SECRET_KEY || '').trim();

(() => {
    if (sha256key === '') {
        throw new Error('[ERROR]: auth - sha256key is not define!');
    }

    if (secretKey === '') {
        throw new Error('[ERROR]: auth - sha256key is not define!');
    }
})();
