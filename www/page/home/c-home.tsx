/* global setTimeout */

import {useState, lazy, ComponentType, Suspense} from 'react';

import {Locale} from '../../provider/locale/c-locale';
import {useLocale} from '../../provider/locale/locale-hook';

import {LoadComponent} from '../../util/c-load-component';
import {Spinner} from '../../layout/spinner/c-spinner';
import {ErrorData} from '../../layout/error-data/c-error-data';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';
import homeStyle from './home.scss';

const LoadMeAsyncLazy = lazy(() => import('../../component/load-me-async-lazy/load-me-async-lazy'));

export function Home(): JSX.Element {
    const {getLocalizedString} = useLocale();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    console.log('evaluate home');

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

            <Suspense fallback={<Spinner position="absolute" />}>
                <LoadMeAsyncLazy smth="asfsa" />
            </Suspense>
        </div>
    );
}
