/* global Location */

import {useCallback, useMemo} from 'react';
import {useHistory} from 'react-router-dom';

import {getParametersFromUrl, objectToUrlParameters} from '../url';
import {ObjectToUrlParametersType, QueryMapType} from '../type';

import {UseUrlHookOptionsType, UseUrlHookType} from './url-hook-type';
import {urlHookDefaultOptions} from './url-hook-const';

export function useUrl<QueryMap extends ObjectToUrlParametersType>(): UseUrlHookType<QueryMap> {
    const routerHistory = useHistory<Location>();

    const queries: QueryMapType<keyof QueryMap> = useMemo(() => {
        const {search} = routerHistory.location;

        return getParametersFromUrl('http://localhost/' + search);
    }, [routerHistory]);

    const persistRoute = useCallback(
        (pathname: string, queriesInner: ObjectToUrlParametersType, options?: UseUrlHookOptionsType): void => {
            const definedOptions = {...urlHookDefaultOptions, ...(options || {})};

            const resultQueryMap = definedOptions.isSaveQuery ? {...queries, ...queriesInner} : queriesInner;

            routerHistory.push({pathname, search: objectToUrlParameters(resultQueryMap)});
        },
        [queries, routerHistory]
    );

    const setQuery = useCallback(
        (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            const {pathname} = routerHistory.location;

            persistRoute(pathname, queryMap, options);
        },
        [routerHistory, persistRoute]
    );

    const getQuery = useCallback(
        (key: keyof QueryMap): string | null => {
            const queryValue: string | void = queries[key];

            return queryValue || null;
        },
        [queries]
    );

    const deleteQuery = useCallback(
        (key: keyof QueryMap): void => {
            const {pathname} = routerHistory.location;
            const queriesInner = {...queries};

            Reflect.deleteProperty(queriesInner, key);

            persistRoute(pathname, queriesInner, {isSaveQuery: false});
        },
        [routerHistory, queries, persistRoute]
    );

    const pushUrl = useCallback(
        (newPathname: string, options?: UseUrlHookOptionsType): void => {
            persistRoute(newPathname, {}, options);
        },
        [persistRoute]
    );

    const pushState = useCallback(
        (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            persistRoute(newPathname, queryMap, options);
        },
        [persistRoute]
    );

    return useMemo((): UseUrlHookType<QueryMap> => {
        return {setQuery, getQuery, deleteQuery, pushUrl, pushState, queries};
    }, [setQuery, getQuery, deleteQuery, pushUrl, pushState, queries]);
}
