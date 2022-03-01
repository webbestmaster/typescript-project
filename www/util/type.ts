export type UnknownObjectType = Record<string, unknown>;

export type NullableType<DefinedType> = DefinedType | DefinedType extends UnknownObjectType
    ? {[PropertyKey in keyof DefinedType]: NullableType<DefinedType[PropertyKey]>}
    : DefinedType | null;
