import {ShareButtonVkontakte} from '../../share-button/button/c-share-button-vkontakte';
import {ShareButtonFacebook} from '../../share-button/button/c-share-button-facebook';
import {ShareButtonOdnoklassniki} from '../../share-button/button/c-share-button-odnoklassniki';
import {ShareButtonTwitter} from '../../share-button/button/c-share-button-twitter';
import {ShareButtonTelegram} from '../../share-button/button/c-share-button-telegram';

import shareButtonListContentStyle from './share-button-list-content.scss';

type PropsType = {
    listHeader: string;
    title: string;
    url: string;
};

export function ShareButtonListContent(props: PropsType): JSX.Element {
    const {url, title, listHeader} = props;

    return (
        <div className={shareButtonListContentStyle.share_button_list__wrapper}>
            <p className={shareButtonListContentStyle.share_button_list__title}>{listHeader}</p>

            <div className={shareButtonListContentStyle.share_button_list}>
                <ShareButtonVkontakte title={title} url={url} />

                <ShareButtonFacebook title={title} url={url} />

                <ShareButtonOdnoklassniki title={title} url={url} />

                <ShareButtonTwitter title={title} url={url} />

                <ShareButtonTelegram title={title} url={url} />
            </div>
        </div>
    );
}
