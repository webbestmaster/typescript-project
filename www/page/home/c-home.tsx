import {Locale} from '../../provider/locale/c-locale';
import {useLocale} from '../../provider/locale/locale-hook';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';
import homeStyle from './home.scss';

export function Home(): JSX.Element {
    const {getLocalizedString} = useLocale();

    return (
        <div>
            <h1 className={homeStyle.home_header}>home page</h1>

            <Locale stringKey="BUTTON__APPLY" />

            <h4>{getLocalizedString('BUTTON__APPLY')}</h4>

            <img alt="" src={pngImageSrc} />

            <img alt="" src={svgImageSrc} />

            <SvgAsReactComponent />
        </div>
    );
}
