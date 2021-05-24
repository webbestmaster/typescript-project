import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';

import homeStyle from './home.scss';

export function Home(): JSX.Element {
    return (
        <div>
            <h1 className={homeStyle.home_header}>home page</h1>

            <div>
                <img alt="" src={pngImageSrc} />

                <img alt="" src={svgImageSrc} />

                <SvgAsReactComponent />
            </div>
        </div>
    );
}
