export function getEnumValue<EnumType>(enumData: Record<string, string>, value: unknown): EnumType | null {
    if (Object.values(enumData).includes(value as string)) {
        return value as EnumType;
    }

    return null;
}

export function getEnumValueEnsure<EnumType>(
    enumData: Record<string, string>,
    value: unknown,
    defaultValue: EnumType
): EnumType {
    const enumValue: EnumType | null = getEnumValue<EnumType>(enumData, value);

    return enumValue === null ? defaultValue : enumValue;
}
