import {classNames} from '../../util/css';

import spinnerStyle from './spinner.scss';
import {defaultSpinnerData} from './spinner-const';
import {SpinnerPositionEnum} from './spinner-type';

const {size: defaultSize} = defaultSpinnerData;

type PropsType = {
    size?: number; // default - 48px
    lineWidth?: number; // default - 5px
    arcColor?: string; // default - $color-border
    circleColor?: string; // default - $light-gray
    isShow?: boolean; // default - true
    position?: keyof typeof SpinnerPositionEnum; // default - static
    wrapperColor?: string; // default - transparent
    wrapperPadding?: number | string; // default - 12px
    wrapperWidth?: number | string; // default - 100%
    wrapperHeight?: number | string; // default - 100%
    className?: string; // default = ''
};

export function Spinner(props: PropsType): JSX.Element | null {
    const {
        size: rawSize,
        lineWidth,
        arcColor,
        circleColor,
        isShow,
        wrapperWidth,
        wrapperHeight,
        position: rawPosition,
        wrapperColor,
        wrapperPadding,
        className,
    } = props;

    if (isShow === false) {
        return null;
    }

    const position = rawPosition || SpinnerPositionEnum.static;
    const size = rawSize || defaultSize;

    const spinnerImageStyle = {
        borderColor: circleColor,
        borderTopColor: arcColor,
        borderWidth: lineWidth,
        height: size,
        width: size,
    };

    const spinnerWrapperStyle = {
        backgroundColor: wrapperColor,
        height: wrapperHeight,
        minHeight: size,
        minWidth: size,
        padding: wrapperPadding,
        position,
        width: wrapperWidth,
    };

    return (
        <div className={classNames(spinnerStyle.spinner_wrapper, className)} style={spinnerWrapperStyle}>
            <div className={spinnerStyle.spinner_image} style={spinnerImageStyle} />
        </div>
    );
}
