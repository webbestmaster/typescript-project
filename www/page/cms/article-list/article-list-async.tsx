import {lazy} from 'react';

import {GuardSuspense} from '../../../layout/guard-suspense';
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
            <GuardSuspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </GuardSuspense>
        </LoginAdminRequired>
    );
}
