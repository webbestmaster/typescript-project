import type {ReactNode} from "react";

import {cls} from "../../util/css";

import isHiddenStyle from "./is-hidden.scss";

interface PropsType {
    readonly children?: ReactNode;
    // eslint-disable-next-line unicorn/no-keyword-prefix
    readonly className?: string;
    readonly isHidden: boolean;
}

export function IsHidden(props: PropsType): JSX.Element {
    const {isHidden, children, className: cssClassName} = props;
    const fullClassName = cls(isHiddenStyle.is_hidden, {[isHiddenStyle.is_hidden__hidden]: isHidden}, cssClassName);

    return <div className={fullClassName}>{children}</div>;
}
