import {lazy} from 'react';

import {GuardSuspense} from '../../layout/guard-suspense';
import {Spinner} from '../../layout/spinner/spinner';

export function AsyncInfo() {
    const AsyncInfoLazy = lazy(
        () =>
            import(
                /* webpackChunkName: 'page-info' */
                './info'
            )
    );

    return (
        <GuardSuspense fallback={<Spinner position="absolute" />}>
            <AsyncInfoLazy />
        </GuardSuspense>
    );
}
