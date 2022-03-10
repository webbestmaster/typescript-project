import {createHmac} from 'crypto';

import {sha256key} from '../key';

export function getSha256Hash(text: string): string {
    return createHmac('sha256', sha256key).update(text).digest('hex');
}

export function getRandomStringHash(length: number): string {
    return getSha256Hash(String(Date.now() + Math.random()).replace('.', '')).slice(0, length);
}
