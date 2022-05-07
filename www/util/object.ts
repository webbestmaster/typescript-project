import Ajv, {JSONSchemaType} from 'ajv';

export function isObjectInclude(object: Record<string, unknown>, query: Record<string, unknown>): boolean {
    return Object.keys(query).every((queryKey: string): boolean => query[queryKey] === object[queryKey]);
}

export function pickData<ModelType, Keys extends keyof ModelType>(
    data: ModelType,
    requiredPropertyList: Array<Partial<keyof ModelType>>
): Pick<ModelType, Keys> {
    return Object.assign(
        {},
        ...requiredPropertyList.map((key: Partial<keyof ModelType>) => {
            return {key: data[key]};
        })
    );
}

export function partialData<FullModelType>(
    data: FullModelType,
    requiredPropertyList: Array<keyof FullModelType>
): Partial<FullModelType> {
    return Object.assign({}, ...requiredPropertyList.map((key: Partial<keyof FullModelType>) => ({key: data[key]})));
}

const ajv = new Ajv();

/*
export function getIsExpectedStructure<ExpectedResponseType>(
    data: unknown,
    jsonSchema: JSONSchemaType<ExpectedResponseType>
): data is ExpectedResponseType {
    const validate = ajv.compile<ExpectedResponseType>(jsonSchema);

    return validate(data);
}
*/

export function getExpectedStructure<ExpectedResponseType>(
    data: unknown,
    jsonSchema: JSONSchemaType<ExpectedResponseType>
): ExpectedResponseType {
    const validate = ajv.compile<ExpectedResponseType>(jsonSchema);

    if (validate(data)) {
        return data;
    }

    throw new Error(JSON.stringify(validate.errors));
}
