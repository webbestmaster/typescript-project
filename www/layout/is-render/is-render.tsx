type PropsType = {
    children?: Array<JSX.Element | string> | JSX.Element | string;
    isRender: boolean;
};

export function IsRender(props: PropsType): JSX.Element | null {
    const {isRender, children} = props;

    if (isRender) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    return null;
}
