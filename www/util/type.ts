import {ComponentType} from 'react';

export type UnknownObjectType = Record<string, unknown>;

export type LazyResultType<ComponentPropsType> = {default: ComponentType<ComponentPropsType>};

export function getStringFromUnknown(data: Record<string, unknown>, requiredKey: string): string {
    // actually data has unknown type
    if (Object.keys(data || {}).length === 0) {
        return '';
    }

    return String(data[requiredKey] || '');
}

export function extractFromUnknown<ExtractType extends Record<string, boolean | number | string | null>>(
    unknownData: unknown,
    resultData: ExtractType
): ExtractType | null {
    if (!unknownData || typeof unknownData !== 'object') {
        return null;
    }

    const requiredKeyList: Array<string> = Object.keys(resultData);
    const existedKeyList: Array<string> = Object.keys(unknownData);

    const hasAllKeys = requiredKeyList.every((requiredKey: string): boolean => existedKeyList.includes(requiredKey));

    if (!hasAllKeys) {
        return null;
    }

    const unknownDataEntryList: Array<[string, unknown]> = Object.entries(unknownData);

    const hasAllTypedKeys = unknownDataEntryList.every((partOfUnknownData: [string, unknown]): boolean => {
        const [unknownDataKey, unknownDataValue] = partOfUnknownData;

        if (requiredKeyList.includes(unknownDataKey)) {
            return typeof resultData[unknownDataKey] === typeof unknownDataValue;
        }

        return true;
    });

    if (!hasAllTypedKeys) {
        return null;
    }

    unknownDataEntryList.forEach((partOfUnknownData: [string, unknown]) => {
        const [unknownDataKey, unknownDataValue] = partOfUnknownData;

        if (requiredKeyList.includes(unknownDataKey)) {
            Object.assign<ExtractType, Record<string, unknown>>(resultData, {[unknownDataKey]: unknownDataValue});
        }
    });

    return resultData;
}
