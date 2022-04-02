import {lazy, Suspense} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../layout/login-admin-required/login-admin-required';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-cms-article-list' */
            './article-list'
        )
);

export function ArticleListAsync() {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
