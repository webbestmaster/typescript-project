import {lazy, Suspense} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../layout/login-admin-required/login-admin-required';

import {CmsArticlePropsType} from './cms-article';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-cms-article' */
            './cms-article'
        )
);

export function CmsArticleAsync(props: CmsArticlePropsType) {
    const {mode} = props;

    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy mode={mode} />
            </Suspense>
        </LoginAdminRequired>
    );
}
