import {ObjectToUrlParametersType, QueryMapType} from '../type';

export type UseUrlHookOptionsType = {
    isSaveQuery?: boolean;
};

export type UseUrlHookOptionsDefinedType = {
    isSaveQuery: boolean;
};

export type UseUrlHookType<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType> = Readonly<{
    deleteQuery: (key: keyof QueryMap) => void;
    getQuery: (key: keyof QueryMap) => string | null;
    pathname: string;
    pushState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    pushUrl: (pathname: string, options?: UseUrlHookOptionsType) => void;
    queries: QueryMapType<keyof QueryMap>;
    setQuery: (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
}>;
