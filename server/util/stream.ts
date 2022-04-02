/* global Buffer, NodeJS */

import {PromiseResolveType} from '../../www/util/promise';

export function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks: Array<Buffer> = [];

    return new Promise((resolve: PromiseResolveType<string>, reject: PromiseResolveType<Error>) => {
        stream.on('data', (chunk: string): unknown => chunks.push(Buffer.from(chunk)));
        stream.on('error', (error: Error): unknown => reject(error));
        stream.on('end', (): unknown => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
