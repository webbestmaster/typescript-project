import {useCallback, useContext} from 'react';

import {classNames} from '../../util/css';
import {ThemeContext} from '../../provider/theme/theme-context';
import {ThemeContextType} from '../../provider/theme/theme-context-type';

import fontSizeStyle from './font-size.scss';

type FontSizePropsType = {
    className?: string;
};

export function FontSize(props: FontSizePropsType): JSX.Element {
    const {className = ''} = props;
    const {mdFontSize, setMdFontSize} = useContext<ThemeContextType>(ThemeContext);

    const memoizedSetFontSizePlus = useCallback(() => {
        setMdFontSize(mdFontSize + 1);
    }, [setMdFontSize, mdFontSize]);

    const memoizedSetFontSizeMinus = useCallback(() => {
        setMdFontSize(mdFontSize - 1);
    }, [setMdFontSize, mdFontSize]);

    return (
        <div className={classNames(fontSizeStyle.font_size, className)}>
            <button className={fontSizeStyle.font_size__button} onClick={memoizedSetFontSizeMinus} type="button">
                A&minus;
            </button>

            <button className={fontSizeStyle.font_size__button} onClick={memoizedSetFontSizePlus} type="button">
                A+
            </button>
        </div>
    );
}
