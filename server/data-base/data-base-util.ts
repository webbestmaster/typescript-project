import {PaginationQueryQueryExtendedType} from './data-base-type';

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

type MergeQueryArgumentType<ModelType> = {
    query: Partial<ModelType>;
    queryExtended: PaginationQueryQueryExtendedType<ModelType>;
};

export function mergeQuery<ModelType>(queries: MergeQueryArgumentType<ModelType>): Record<string, unknown> {
    const {query, queryExtended} = queries;

    const result: Record<string, unknown> = {
        ...query,
    };

    for (const key in queryExtended) {
        const value = queryExtended[key];
        const {$regex, $regexFlag} = value || {};

        if (typeof $regex === 'string' && typeof $regexFlag === 'string') {
            result[key] = new RegExp($regex, $regexFlag);
        }
    }

    return result;
}
