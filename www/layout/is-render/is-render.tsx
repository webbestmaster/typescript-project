import {ReactNode} from 'react';

type PropsType = {
    children?: ReactNode;
    isRender: boolean;
};

export function IsRender(props: PropsType): ReactNode {
    const {isRender, children} = props;

    return isRender ? children : null;
}
