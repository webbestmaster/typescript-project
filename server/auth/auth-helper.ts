import {createHmac} from 'crypto';

import {sha256key} from './auth-key';

export function getSha256Hash(text: string): string {
    return createHmac('sha256', sha256key).update(text).digest('hex');
}

console.log(getSha256Hash(''));
