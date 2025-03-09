import {type ComponentType, type JSX, lazy, Suspense} from "react";

import {Spinner} from "../../../layout/spinner/spinner";
import type {LazyResultType} from "../../../util/type";

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {Login} = await import(
        /* webpackChunkName: 'page-login' */
        "./login.tsx"
    );

    return {"default": Login};
});

export function LoginAsync(): JSX.Element {
    return (
        <Suspense fallback={<Spinner position="absolute" />}>
            <AsyncLazy />
        </Suspense>
    );
}
