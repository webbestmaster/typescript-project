import {lazy} from 'react';

import {GuardSuspense} from '../../../layout/guard-suspense';
import {Spinner} from '../../../layout/spinner/spinner';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-login' */
            './login'
        )
);

export function LoginAsync() {
    return (
        <GuardSuspense fallback={<Spinner position="absolute" />}>
            <AsyncLazy />
        </GuardSuspense>
    );
}
