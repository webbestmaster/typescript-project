/* global fetch, Headers, FormData, Response, File */

export enum FetchMethodEnum {
    get = 'GET',
    post = 'POST',
    patch = 'PATCH',
    put = 'PUT',
    delete = 'DELETE',
}

type OptionsType = {
    method?: FetchMethodEnum; // GET, POST, PUT, DELETE, etc. (default: GET)
    mode?: 'cors' | 'no-cors' | 'same-origin'; // no-cors, cors, same-origin (default: same-origin)
    // cache?: 'default'; // default, no-cache, reload, force-cache, only-if-cached (default: default)
    credentials?: 'include' | 'same-origin' | 'omit'; // include, same-origin, omit (default: same-origin)
    // headers?: {
    //     'Access-Control-Allow-Headers'?: '*',
    //     Accept?: 'application/json, text/javascript, */*; q=0.01',
    //     'Content-Type'?: 'application/x-www-form-urlencoded; charset=UTF-8',
    // },
    headers?: Headers | Array<Array<string>> | Record<string, string>;
    // redirect?: 'follow'; // manual, follow, error (default: follow)
    // referrer?: 'no-referrer'; // no-referrer, client (default: client)
    body?: File | FormData | string; // body data type must match "Content-Type" header
};

type FetchCacheType = Record<string, null | Promise<unknown>>;

const fetchCache: FetchCacheType = {};

function validateCache(options?: OptionsType) {
    const {method} = options || {};

    if (!method || method === FetchMethodEnum.get) {
        return;
    }

    Object.keys(fetchCache).forEach((key: string) => {
        fetchCache[key] = null;
    });
}

export function fetchX<ExpectedResponseType>(url: string, options?: OptionsType): Promise<ExpectedResponseType> {
    validateCache(options);

    const cacheProperty = `${url} - ${JSON.stringify(options || '[empty]')}`;

    const savedPromiseResult = fetchCache[cacheProperty];

    if (savedPromiseResult) {
        // console.log(`[CACHE]: [fetchX]\n> url: ${url},\n> options: ${JSON.stringify(options || '[empty]')}`);
        return savedPromiseResult as Promise<ExpectedResponseType>;
    }

    const definedOptions: OptionsType = {
        credentials: 'include',
        ...(options || {}),
    };

    const fetchResult = fetch(url, definedOptions)
        .then((result: Response): Promise<ExpectedResponseType> => {
            if (result.ok) {
                return result.json();
            }

            throw new Error(JSON.stringify(result));
        })
        .catch((error: Error): Error => {
            fetchCache[cacheProperty] = null;

            throw error;
        });

    fetchCache[cacheProperty] = fetchResult;

    return fetchResult as Promise<ExpectedResponseType>;
}
