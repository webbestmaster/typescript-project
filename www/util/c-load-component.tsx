import {useEffect, useState} from 'react';

import {Spinner} from '../layout/spinner/c-spinner';

type PropsType = {
    children: () => Promise<JSX.Element>;
};

export function LoadComponent(props: PropsType): JSX.Element | null {
    const {children: load} = props;
    const [component, setComponent] = useState<JSX.Element | null>(null);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);

    useEffect(() => {
        setIsInProgress(true);

        load()
            .then(setComponent)
            .finally(() => setIsInProgress(false))
            .catch(console.log);
    }, [load]);

    return isInProgress ? <Spinner /> : component;
}
