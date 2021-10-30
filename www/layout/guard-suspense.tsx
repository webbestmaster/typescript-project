import {Suspense, ReactNode} from 'react';

import {isBrowser} from '../util/system';

type PropsType = {
    children: ReactNode;
    fallback: JSX.Element;
};

export function GuardSuspense(props: PropsType): JSX.Element {
    const {children, fallback} = props;

    return isBrowser ? <Suspense fallback={fallback}>{children}</Suspense> : fallback;
}
