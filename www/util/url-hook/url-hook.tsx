/* global Location */

import {useMemo, useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import {getParametersFromUrl, objectToUrlParameters} from '../url';
import {ObjectToUrlParametersType, QueryMapType} from '../type';

import {UseUrlHookOptionsType, UseUrlHookType} from './url-hook-type';
import {urlHookDefaultOptions} from './url-hook-const';

export function useUrl<QueryMap extends ObjectToUrlParametersType>(): UseUrlHookType<QueryMap> {
    const routerHistory = useHistory<Location>();

    const {search, pathname: currentPathname} = routerHistory.location;

    const queries: QueryMapType<keyof QueryMap> = useMemo(
        () => getParametersFromUrl('http://localhost/' + search),
        [search]
    );

    const persistRoute = useCallback(
        (pathname: string, queriesInner: ObjectToUrlParametersType, options?: UseUrlHookOptionsType): void => {
            const definedOptions = {...urlHookDefaultOptions, ...options || {}};

            const resultQueryMap = definedOptions.isSaveQuery ? {...queries, ...queriesInner} : queriesInner;

            routerHistory.push({pathname, search: objectToUrlParameters(resultQueryMap)});
        },
        [queries, routerHistory]
    );

    const setQuery = useCallback(
        (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            persistRoute(currentPathname, queryMap, options);
        },
        [currentPathname, persistRoute]
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
            const queriesInner = {...queries};

            Reflect.deleteProperty(queriesInner, key);

            persistRoute(currentPathname, queriesInner, {isSaveQuery: false});
        },
        [currentPathname, queries, persistRoute]
    );

    const pushUrl = useCallback(
        (newPathname: string, options?: UseUrlHookOptionsType): void => {
            persistRoute(currentPathname, {}, options);
        },
        [persistRoute, currentPathname]
    );

    const pushState = useCallback(
        (newPathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType): void => {
            persistRoute(currentPathname, queryMap, options);
        },
        [persistRoute, currentPathname]
    );

    return useMemo((): UseUrlHookType<QueryMap> => {
        return {setQuery, getQuery, deleteQuery, pushUrl, pushState, queries};
    }, [setQuery, getQuery, deleteQuery, pushUrl, pushState, queries]);
}
