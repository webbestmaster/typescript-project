/* global URLSearchParams */
import {generatePath as reactRouterGeneratePath} from 'react-router-dom';

import {PaginationQueryType} from '../../server/data-base/data-base-type';

// eslint-disable-next-line id-length
export function paginationQueryToURLSearchParameters<DataType>(
    paginationQuery: PaginationQueryType<DataType>,
    pick: Array<keyof DataType>
): URLSearchParams {
    return new URLSearchParams({
        pagination: encodeURIComponent(JSON.stringify(paginationQuery)),
        pick: encodeURIComponent(JSON.stringify(pick)),
    });
}

type ExtractKeysType<StringConstType> = StringConstType extends `${string}:${infer KeyNames}/${infer Rest}`
    ? ExtractKeysType<Rest> & {[key in KeyNames]: string}
    : StringConstType extends `${string}:${infer KeyNames}`
    ? ExtractKeysType<string> & {[key in KeyNames]: string}
    : Record<never, string>;

export function generatePath<PathType extends string>(rawPath: PathType, pathData: ExtractKeysType<PathType>): string {
    return reactRouterGeneratePath(rawPath, pathData);
}

/*
// eslint-disable-next-line id-length
export function urlSearchParametersToPaginationQuery<DataType>(
    urlSearchParameters: URLSearchParams
): {pagination: PaginationQueryType<DataType>} {
    const pagination = urlSearchParameters.get('pagination') || encodeURIComponent(JSON.stringify({}));

    const result: PaginationQueryType<DataType> = JSON.parse(decodeURIComponent(pagination));

    return result;
}
*/
