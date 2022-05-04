import {makeCssArray} from './box-helper';

type BoxPropsType = {
    boxSizing?: 'border-box' | 'content-box' | 'initial';
    children: Array<JSX.Element> | JSX.Element;
    height?: string;
    isInline?: boolean;
    margin?: Array<number> | number;
    padding?: Array<number> | number;
    width?: string;
};

// TODO: test this component
export function Box(props: BoxPropsType): JSX.Element {
    const {children, isInline = false, margin, padding, width = 'auto', height = 'auto', boxSizing = 'initial'} = props;

    const [marginTop, marginRight, marginBottom, marginLeft, paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        ...makeCssArray(margin),
        ...makeCssArray(padding),
    ].map((value: number): string => `${value}px`);

    const style = {
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
