export type QueryKeyType = number | string | symbol;

export type QuerySimpleValueType = Date | boolean | number | string | null | void;

export type QueryValueType = Array<QuerySimpleValueType> | QuerySimpleValueType;

export type ObjectToUrlParametersType = Readonly<Record<string, QueryValueType>>;

export type QueryMapType<QueryKey extends QueryKeyType = QueryKeyType> = Readonly<Record<QueryKey, string | void>>;
