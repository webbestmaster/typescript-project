import {PromiseResolveType} from '../../www/util/promise';

import {CrudSearchQueryType, RegExQueryType} from './data-base-type';

export function makeSimpleDataBaseCallBack(
    maybeError: Error | null,
    resolve: PromiseResolveType<null>,
    reject: PromiseResolveType<Error>
) {
    if (maybeError) {
        reject(maybeError);
        return;
    }

    resolve(null);
}

export function partialData<FullModelType extends Record<string, unknown>>(
    data: FullModelType,
    requiredPropertyList: Array<keyof FullModelType>
): Partial<FullModelType> {
    return Object.assign(
        {},
        ...requiredPropertyList.map((key: Partial<keyof FullModelType>) => {
            return {[key]: data[key]};
        })
    );
}

export function getRegExFromUnknown(value: unknown): RegExQueryType | null {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const objectKeys: Array<string> = Object.keys(value);

    if (!objectKeys.includes('$regex') || !objectKeys.includes('$regexFlag')) {
        return null;
    }

    const data = Object.assign<RegExQueryType, unknown>({$regex: '', $regexFlag: ''}, value);

    const {$regex, $regexFlag} = data;

    return {$regex, $regexFlag};
}

export function prepareQuery<ModelType>(query: CrudSearchQueryType<ModelType>): CrudSearchQueryType<ModelType> {
    const result: CrudSearchQueryType<ModelType> = {};

    // eslint-disable-next-line guard-for-in, no-loops/no-loops
    for (const key in query) {
        Object.assign(result, {[key]: query[key]});

        const mayBeRegEx: RegExQueryType | null = getRegExFromUnknown(query[key]);

        if (mayBeRegEx) {
            Object.assign(result, {[key]: new RegExp(mayBeRegEx.$regex, mayBeRegEx.$regexFlag)});
        }
    }

    return result;
}
