/* global document, setTimeout, clearTimeout, NodeJS */

import {ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import popupStyle from './popup.scss';
import {PopupVisibleStateEnum} from './popup-const';

const fadeClassNameMap: Record<PopupVisibleStateEnum, string> = {
    [PopupVisibleStateEnum.closed]: popupStyle.popup__fade__closed,
    [PopupVisibleStateEnum.opening]: popupStyle.popup__fade__opening,
    [PopupVisibleStateEnum.open]: popupStyle.popup__fade__open,
    [PopupVisibleStateEnum.closing]: popupStyle.popup__fade__closing,
};

const containerClassNameMap: Record<PopupVisibleStateEnum, string> = {
    [PopupVisibleStateEnum.closed]: popupStyle.popup__container__closed,
    [PopupVisibleStateEnum.opening]: popupStyle.popup__container__opening,
    [PopupVisibleStateEnum.open]: popupStyle.popup__container__open,
    [PopupVisibleStateEnum.closing]: popupStyle.popup__container__closing,
};

type PopupPropsType = {
    children: ReactNode;
    isOpen: boolean;
    zIndex?: number;
};

export function Popup(props: PopupPropsType): JSX.Element | null {
    const transitionTime = 1e3;
    const {isOpen = false, children, zIndex = 1000} = props;

    const [isSelfOpen, setIsSelfOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timeOutRef = useRef<NodeJS.Timeout | number>(Number.NaN);

    const visibleState: PopupVisibleStateEnum = (() => {
        if (isOpen === isSelfOpen) {
            return isSelfOpen ? PopupVisibleStateEnum.open : PopupVisibleStateEnum.closed;
        }

        return isOpen ? PopupVisibleStateEnum.opening : PopupVisibleStateEnum.closing;
    })();

    const infoState = [
        `Popup - isOpen: ${String(isOpen)}`,
        `Popup - isSelfOpen: ${String(isSelfOpen)}`,
        `Popup - visibleState: ${String(visibleState)}`,
    ].join('\n');

    console.info(`%c${infoState}`, 'font-size: 24px');

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
            clearTimeout(timeOutRef.current);
        };
    }, []);

    useEffect(() => {
        clearTimeout(timeOutRef.current);

        if (isOpen === isSelfOpen) {
            return;
        }

        timeOutRef.current = setTimeout(() => {
            setIsSelfOpen(isOpen);
        }, transitionTime);
    }, [isOpen, isSelfOpen, timeOutRef]);

    if (visibleState === PopupVisibleStateEnum.closed) {
        return null;
    }

    if (typeof document === 'undefined' || isMounted === false) {
        return null;
    }

    const style = {zIndex};

    const fadeClassName = `${popupStyle.popup__fade} ${fadeClassNameMap[visibleState]}`;
    const containerClassName = `${popupStyle.popup__container} ${containerClassNameMap[visibleState]}`;

    return createPortal(
        <>
            <div className={fadeClassName} style={style} />
            <div className={containerClassName} style={style}>
                {children} {visibleState}
            </div>
        </>,
        document.body
    );
}
