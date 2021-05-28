import {useEffect, useState} from 'react';

type PropsType = {
    children: () => Promise<JSX.Element>;
    spinner: JSX.Element;
    error: JSX.Element;
};

export function LoadComponent(props: PropsType): JSX.Element | null {
    const {children: load, spinner, error} = props;
    const [component, setComponent] = useState<JSX.Element | null>(null);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<Error | null>(null);

    useEffect(() => {
        setIsInProgress(true);

        load()
            .then(setComponent)
            .finally(() => setIsInProgress(false))
            .catch(setLoadingError);
    }, [load]);

    if (loadingError) {
        return error;
    }

    return isInProgress ? spinner : component;
}
