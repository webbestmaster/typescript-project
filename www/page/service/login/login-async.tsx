import {lazy, Suspense} from 'react';

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
        <Suspense fallback={<Spinner position="absolute" />}>
            <AsyncLazy />
        </Suspense>
    );
}
