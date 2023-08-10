import {cls} from '../../util/css';

import spinnerStyle from './spinner.scss';

type PropsType = {
    // eslint-disable-next-line unicorn/no-keyword-prefix
    readonly className?: string;
    readonly isShow?: boolean;
};

export function AsciiSpinner(props: PropsType): JSX.Element | null {
    const {isShow = true, className: cssClassName} = props;

    if (!isShow) {
        return null;
    }

    const wrapperClassName = cls(spinnerStyle.ascii_spinner, cssClassName);

    return <span aria-busy="true" className={wrapperClassName} />;
}
