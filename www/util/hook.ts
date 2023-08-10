import {useCallback, useMemo, useState} from 'react';

import {UseRefreshApiHookType} from '../service/api-hook/api-hook-type';

import {getRandomString} from './string';

export function useRefreshId(): UseRefreshApiHookType {
    const [refreshId, setRefreshId] = useState<string>('initial-refresh-id');

    const refresh = useCallback(() => setRefreshId(getRandomString()), [setRefreshId]);

    return useMemo(() => ({refresh, refreshId}), [refreshId, refresh]);
}

export function useUpdaterInList<ItemType>(
    itemList: Array<ItemType>,
    setItemList: (updateItemList: Array<ItemType>) => void
): (oldItem: ItemType, updateItem: ItemType) => void {
    return useCallback(
        (oldItem: ItemType, updateItem: ItemType) => {
            const index = itemList.indexOf(oldItem);

            if (index === -1) {
                console.error('[ERROR]: Can not update: useUpdaterInList');
                return;
            }

            const updateItemList = [...itemList];

            updateItemList[index] = updateItem;

            setItemList(updateItemList);
        },
        [itemList, setItemList]
    );
}
