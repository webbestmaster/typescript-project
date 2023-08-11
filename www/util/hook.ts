import {useCallback, useMemo, useState} from 'react';

import {UseRefreshApiHookType} from '../service/api-hook/api-hook-type';

import {getRandomString} from './string';

export function useRefreshId(): UseRefreshApiHookType {
    const [refreshId, setRefreshId] = useState<string>('initial-refresh-id');

    const refresh = useCallback(() => {
        return setRefreshId(getRandomString());
    }, [setRefreshId]);

    return useMemo(() => {
        return {refresh, refreshId};
    }, [refreshId, refresh]);
}
