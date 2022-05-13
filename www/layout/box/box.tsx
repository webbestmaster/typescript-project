import {ReactNode} from 'react';

import {makeCssArray} from './box-helper';

type BoxPropsType = {
    backgroundColor?: string;
    boxSizing?: 'border-box' | 'content-box' | 'initial';
    children: ReactNode;
    height?: number | string;
    isInline?: boolean;
    margin?: Array<number> | number;
    padding?: Array<number> | number;
    width?: number | string;
};

export function Box(props: BoxPropsType): JSX.Element {
    const {
        children,
        isInline = false,
        margin,
        padding,
        width = 'auto',
        height = 'auto',
        boxSizing = 'initial',
        backgroundColor = 'transparent',
    } = props;

    const [marginTop, marginRight, marginBottom, marginLeft, paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        ...makeCssArray(margin),
        ...makeCssArray(padding),
    ].map((value: number): string => `${value}px`);

    const style = {
        backgroundColor,
        boxSizing,
        height,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        width,
    };

    return isInline ? <span style={style}>{children}</span> : <div style={style}>{children}</div>;
}
