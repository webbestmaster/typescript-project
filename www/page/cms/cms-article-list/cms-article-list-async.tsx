import {lazy, Suspense} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../layout/login-admin-required/login-admin-required';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-cms-article-list' */
            './cms-article-list'
        )
);

export function CmsArticleListAsync() {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
