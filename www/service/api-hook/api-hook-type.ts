export type UseHookType<HookData> = {
    isInProgress: boolean;
    processError: Error | null;
    result: HookData | null;
    reset: () => void;
};

export type UseRefreshApiHookType = {
    refresh: () => void;
    refreshId: string;
};
