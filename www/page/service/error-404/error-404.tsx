import type {JSX} from "react";

import {Empty} from "../../../layout/empty/empty";
import {IsHidden} from "../../../layout/is-hidden/is-hidden";
import {IsRender} from "../../../layout/is-render/is-render";
import {Spinner} from "../../../layout/spinner/spinner";
import * as page404Style from "./page-404.scss";

export function Error404(): JSX.Element {
    return (
        <div>
            <h1 className={page404Style.page_404_header} data-text="Page 404">
                Page 404
            </h1>

            <IsRender isRender={false}>
                <IsHidden isHidden={false}>
                    <Empty mainText="EMPTY__THERE_IS_NOTHING_HERE_YET" secondaryText="EMPTY__TRY_CHANGING_FILTERS" />

                    <Spinner position="static" />
                </IsHidden>
            </IsRender>
        </div>
    );
}
