import {UnknownObjectType} from '../../www/util/type';

export type BinaryIntType = 0 | 1;

export type DataBaseType<FullDefinedType extends UnknownObjectType> = {
    [KeyType in keyof FullDefinedType]: FullDefinedType[KeyType] extends boolean
        ? BinaryIntType
        : FullDefinedType[KeyType] extends number
        ? number
        : string;
};
