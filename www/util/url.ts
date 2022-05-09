/* global URLSearchParams */
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
