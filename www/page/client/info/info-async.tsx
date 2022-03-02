import {lazy} from 'react';

import {GuardSuspense} from '../../../layout/guard-suspense';
import {Spinner} from '../../../layout/spinner/spinner';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-info' */
            './info'
        )
);

export function InfoAsync() {
    return (
        <GuardSuspense fallback={<Spinner position="absolute" />}>
            <AsyncLazy />
        </GuardSuspense>
    );
}
