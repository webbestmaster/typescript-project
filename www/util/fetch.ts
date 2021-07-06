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

function fetchEndCallBack(fetchBeginTimeStamp: number, url: string) {
    const maxFetchingTime = 2e3; // 2 seconds
    const fetchEndTimeStamp = Date.now();
    const fetchingTime = fetchEndTimeStamp - fetchBeginTimeStamp;

    if (fetchingTime > maxFetchingTime) {
        console.log(`%c[WARNING]: "${url}" took %c${fetchingTime / 1e3}s`, 'color: #00c', 'color: #c00');
    }
}

export async function fetchX<ExpectedResponseType>(url: string, options?: OptionsType): Promise<ExpectedResponseType> {
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

    const fetchBeginTimeStamp = Date.now();

    const response = await fetch(url, definedOptions);

    if (response.ok) {
        const resultAsJson = await response.json();

        fetchEndCallBack(fetchBeginTimeStamp, url);

        fetchCache[cacheProperty] = resultAsJson;

        return resultAsJson;
    }

    fetchCache[cacheProperty] = null;

    const errorText = await response.text();

    throw new Error(errorText);
}
