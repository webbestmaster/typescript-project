import {UnknownObjectType} from '../../www/util/type';

export type BinaryIntType = 0 | 1;

export type DataBaseType<FullDefinedType extends UnknownObjectType> = {
    [KeyType in keyof FullDefinedType]: FullDefinedType[KeyType] extends boolean
        ? BinaryIntType
        : FullDefinedType[KeyType] extends number
        ? number
        : string;
};

export enum SortDirectionEnum {
    asc = 'asc',
    desc = 'desc',
}

export type GetListPaginationArgumentType = {
    needShowInactive: boolean;
    pageIndex: number; // start with 0
    pageSize: number;
    sortBy: string;
    sortDirection: SortDirectionEnum;
};

export type GetListPaginationResultType<ItemType> = GetListPaginationArgumentType & {
    allItemCount: number;
    itemList: Array<ItemType>;
};
