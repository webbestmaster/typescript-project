export type QueryKeyType = string | number | symbol;

export type QuerySimpleValueType = Date | string | number | boolean | null | void;

export type QueryValueType = Array<QuerySimpleValueType> | QuerySimpleValueType;

export type ObjectToUrlParametersType = Readonly<Record<string, QueryValueType>>;

export type QueryMapType<QueryKey extends QueryKeyType> = Readonly<Record<QueryKey, string | void>>;
