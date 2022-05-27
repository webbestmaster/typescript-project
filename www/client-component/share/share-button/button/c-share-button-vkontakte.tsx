import shareButtonStyle from '../share-button.scss';
import type {ShareButtonPropsType} from '../share-button-type';
import {share} from '../share-button-helper';
import {SvgImage} from '../../../../layout/svg-image/c-svg-image';
import {shareIconIdPrefix} from '../c-share-button-sprite';

export function ShareButtonVkontakte(props: ShareButtonPropsType): JSX.Element {
    const {url, title} = props;

    function handleClick() {
        share(`http://vk.com/share.php?url=${encodeURIComponent(url)}`, title);
    }

    return (
        <button
            aria-label="vkontakte"
            className={shareButtonStyle.share_button__vkontakte}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={handleClick}
            type="button"
        >
            <SvgImage
                className={shareButtonStyle.share_button__image}
                imageId={'#' + shareIconIdPrefix + 'vkontakte'}
            />
        </button>
    );
}