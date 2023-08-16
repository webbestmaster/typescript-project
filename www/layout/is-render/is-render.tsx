import type {ReactNode} from 'react';

interface PropsType {
    readonly children?: ReactNode;
    readonly isRender: boolean;
}

export function IsRender(props: PropsType): ReactNode {
    const {isRender, children} = props;

    return isRender ? children : null;
}
