interface PropsType {
    // -- eslint-disable-next-line unicorn/no-keyword-prefix
    readonly className: string;
    readonly imageId: string;
}

export function SvgImage(props: PropsType): JSX.Element {
    const {className: cssClassName, imageId} = props;

    return (
        <svg className={cssClassName}>
            <use xlinkHref={imageId} />
        </svg>
    );
}
