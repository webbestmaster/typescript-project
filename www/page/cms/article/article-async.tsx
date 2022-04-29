import {lazy, Suspense} from 'react';

import {Spinner} from '../../../layout/spinner/spinner';
import {LoginAdminRequired} from '../../../layout/login-admin-required/login-admin-required';

import {ArticlePropsType} from './article';

const AsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'page-cms-article' */
            './article'
        )
);

export function ArticleAsync(props: ArticlePropsType) {
    const {mode} = props;

    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy mode={mode} />
            </Suspense>
        </LoginAdminRequired>
    );
}
