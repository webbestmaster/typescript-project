import {ObjectToUrlParametersType, QueryMapType} from '../type';

export type UseUrlHookOptionsType = {
    isSaveQuery?: boolean;
};

export type UseUrlHookOptionsDefinedType = {
    isSaveQuery: boolean;
};

export type UseUrlHookType<QueryMap extends ObjectToUrlParametersType = ObjectToUrlParametersType> = Readonly<{
    setQuery: (queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    getQuery: (key: keyof QueryMap) => string | null;
    deleteQuery: (key: keyof QueryMap) => void;
    pushUrl: (pathname: string, options?: UseUrlHookOptionsType) => void;
    pushState: (pathname: string, queryMap: Partial<QueryMap>, options?: UseUrlHookOptionsType) => void;
    pathname: string;
    queries: QueryMapType<keyof QueryMap>;
}>;
