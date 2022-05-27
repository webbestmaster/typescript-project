import shareButtonStyle from '../share-button.scss';
import type {ShareButtonPropsType} from '../share-button-type';
import {share} from '../share-button-helper';
import {SvgImage} from '../../../../layout/svg-image/c-svg-image';
import {shareIconIdPrefix} from '../c-share-button-sprite';

export function ShareButtonTelegram(props: ShareButtonPropsType): JSX.Element {
    const {url, title} = props;

    function handleClick() {
        share(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${title}`, title);
    }

    return (
        <button
            aria-label="telegram"
            className={shareButtonStyle.share_button__telegram}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={'#' + shareIconIdPrefix + 'telegram'} />
        </button>
    );
}
