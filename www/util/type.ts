export type NullableType<DefinedType> = DefinedType | null;

export type NullablePropertyType<DefinedType> = {
    [PropertyKey in keyof DefinedType]: NullableType<DefinedType[PropertyKey]>;
};
