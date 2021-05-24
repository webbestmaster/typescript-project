import {useCallback, useMemo, useState} from 'react';

type StateHooksType<DateType> = {
    isInProgress: boolean;
    setIsInProgress: (isInProgress: boolean) => void;
    processError: Error | null;
    setProcessError: (processError: Error | null) => void;
    result: DateType | null;
    setResult: (result: DateType | null) => void;
    reset: () => void;
};

export function useApiHooks<DateType>(): StateHooksType<DateType> {
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [processError, setProcessError] = useState<Error | null>(null);
    const [result, setResult] = useState<DateType | null>(null);

    const reset = useCallback(() => {
        setProcessError(null);
        setIsInProgress(false);
        setResult(null);
    }, [setProcessError, setIsInProgress, setResult]);

    return useMemo(() => {
        return {
            isInProgress,
            setIsInProgress,
            processError,
            setProcessError,
            result,
            setResult,
            reset,
        };
    }, [isInProgress, setIsInProgress, processError, setProcessError, result, setResult, reset]);
}
