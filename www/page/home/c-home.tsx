import {Locale} from '../../provider/locale/c-locale';
import {useLocale} from '../../provider/locale/locale-hook';

import {LoadComponent} from '../../util/c-load-component';
import {Spinner} from '../../layout/spinner/c-spinner';
import {ErrorData} from '../../layout/error-data/c-error-data';

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

            <LoadComponent error={<ErrorData langKey="ERROR__CAN_NOT_LOAD_THE_COMPONENT" />} spinner={<Spinner />}>
                {async (): Promise<JSX.Element> => {
                    const {LoadMeAsync} = await import(
                        /* webpackChunkName: 'the-load-me-async' */ '../../component/load-me-async/load-me-async'
                    );

                    return <LoadMeAsync />;
                }}
            </LoadComponent>
        </div>
    );
}