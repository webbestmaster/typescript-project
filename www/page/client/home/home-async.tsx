import {lazy, Suspense, ComponentType} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LazyResultType} from '../../../util/type';

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {Home} = await import(
        /* webpackChunkName: 'page-home' */
        './home'
    );

    return {'default': Home};
});

export function HomeAsync() {
    return (
        <Suspense fallback={<Spinner position="absolute" />}>
            <AsyncLazy />
        </Suspense>
    );
}
