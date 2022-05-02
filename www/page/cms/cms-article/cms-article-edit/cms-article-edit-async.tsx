import {lazy, Suspense} from 'react';

import {Spinner} from '../../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../../layout/login-admin-required/login-admin-required';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-cms-article-edit' */
            './cms-article-edit'
        )
);

export function CmsArticleEditAsync() {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
