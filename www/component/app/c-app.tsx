import {SystemProvider} from '../../provider/system/c-system-context';
import {LocaleProvider} from '../../provider/locale/c-locale-context';

import appStyle from './app.scss';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';

export function App(): JSX.Element {
    return (
        <SystemProvider>
            <LocaleProvider>
                <div>
                    <img alt="" src={pngImageSrc} />

                    <img alt="" src={svgImageSrc} />

                    <SvgAsReactComponent />

                    <h1 className={appStyle.app_header}>app name</h1>
                </div>
            </LocaleProvider>
        </SystemProvider>
    );
}
