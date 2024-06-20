import {type ComponentType, lazy, Suspense} from "react";

import {LoginAdminRequired} from "../../../../layout/login-admin-required/login-admin-required";
import {Spinner} from "../../../../layout/spinner/spinner";
import type {LazyResultType} from "../../../../util/type";

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {CmsArticleEdit} = await import(
        /* webpackChunkName: 'page-cms-article-edit' */
        "./cms-article-edit"
    );

    return {"default": CmsArticleEdit};
});

export function CmsArticleEditAsync(): JSX.Element {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
