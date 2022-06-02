import {useState} from 'react';

import {applyGdpr, getDefaultIsVisible} from './gdpr-info-helper';
import gdprInfoStyle from './gdpr-info.scss';

export function GdprInfo(): JSX.Element | null {
    const [isVisible, setIsVisible] = useState<boolean>(getDefaultIsVisible());

    function handleApplyGdpr() {
        setIsVisible(false);

        applyGdpr();
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className={gdprInfoStyle.gdpr_info__wrapper}>
            <div className={gdprInfoStyle.gdpr_info__container}>
                <p className={gdprInfoStyle.gdpr_info__text}>
                    Пользуясь настоящим веб-сайтом, вы даёте свое согласие на использование файлов cookies.
                </p>

                <button
                    className={gdprInfoStyle.gdpr_info__button}
                    onClick={handleApplyGdpr}
                    title="GDPR"
                    type="button"
                >
                    <span className={gdprInfoStyle.gdpr_info__button__icon__close} />
                </button>
            </div>
        </div>
    );
}
