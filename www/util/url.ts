/* global URL */

import {ObjectToUrlParametersType, QueryMapType, QuerySimpleValueType, QueryValueType} from './type';

// eslint-disable-next-line complexity
function stringifyUrlParameterSimpleValue(value: QuerySimpleValueType): string | null {
    // QuerySimpleValueType

    // void | null
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    // empty string
    if (typeof value === 'string' && value.trim() === '') {
        return null;
    }

    // Date
    if (value instanceof Date && !Number.isNaN(value)) {
        return value.toISOString();
    }

    // boolean | number | string
    return value.toString();
}

export function objectToUrlParameters(options?: ObjectToUrlParametersType): string {
    if (!options) {
        return '';
    }

    const parameterList: Array<string> = [];

    Object.keys(options).forEach((key: string) => {
        const value: QueryValueType = options[key];

        if (Array.isArray(value) && value.length === 0) {
            return;
        }

        if (Array.isArray(value)) {
            const stringList: Array<string> = value
                .map<string | null>((simpleValue: QuerySimpleValueType): string | null =>
                    stringifyUrlParameterSimpleValue(simpleValue)
                )
                .filter<string>((stringValueInner: string | null): stringValueInner is string =>
                    Boolean(stringValueInner)
                );

            parameterList.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringList.join(',')));
            return;
        }

        const stringValue: string | null = stringifyUrlParameterSimpleValue(value);

        if (stringValue) {
            parameterList.push(encodeURIComponent(key) + '=' + encodeURIComponent(stringValue));
        }
    });

    return parameterList.join('&');
}

export function getParametersFromUrl(fullUrlString: string): QueryMapType {
    const url: URL = new URL(fullUrlString);

    const {searchParams} = url;

    const keyList: Array<string> = [...searchParams.keys()];

    return keyList.reduce((data: QueryMapType, key: string): QueryMapType => {
        const value = searchParams.get(key);

        if (typeof value !== 'string') {
            return data;
        }

        return {...data, [key]: value};
    }, {});
}
