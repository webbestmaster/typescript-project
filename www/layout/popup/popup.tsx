/* global document, setTimeout, clearTimeout, NodeJS, HTMLDivElement */

import {type ReactNode, useEffect, useRef, useState, type DetailedHTMLProps, type HTMLAttributes} from 'react';
import {createPortal} from 'react-dom';

import {cls} from '../../util/css';

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

interface PopupPropsType {
    readonly animationDurationMs?: number;
    readonly children: ReactNode;
    readonly containerProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    readonly fadeProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    readonly isOpen: boolean;
    readonly zIndex?: number;
}

// eslint-disable-next-line complexity
export function Popup(props: PopupPropsType): JSX.Element | null {
    const {isOpen = false, children, zIndex = 1000, animationDurationMs = 300} = props;

    const mainStyle = {
        animationDuration: `${animationDurationMs}ms`,
        zIndex,
    };

    const {fadeProps = {}, containerProps = {}} = props;

    const [isSelfOpen, setIsSelfOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timeOutRef = useRef<NodeJS.Timeout | number>(Number.NaN);

    const visibleState: PopupVisibleStateEnum = (() => {
        if (isOpen === isSelfOpen) {
            return isSelfOpen ? PopupVisibleStateEnum.open : PopupVisibleStateEnum.closed;
        }

        return isOpen ? PopupVisibleStateEnum.opening : PopupVisibleStateEnum.closing;
    })();

    // eslint-disable-next-line unicorn/no-keyword-prefix
    fadeProps.className = cls(popupStyle.popup__fade, fadeClassNameMap[visibleState], fadeProps.className);
    fadeProps.style = {...fadeProps.style, ...mainStyle};

    // eslint-disable-next-line unicorn/no-keyword-prefix
    containerProps.className = cls(
        popupStyle.popup__container,
        containerClassNameMap[visibleState],
        containerProps.className
    );
    containerProps.style = {...containerProps.style, ...mainStyle};

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
        }, animationDurationMs);
    }, [isOpen, isSelfOpen, timeOutRef, animationDurationMs]);

    if (visibleState === PopupVisibleStateEnum.closed) {
        return null;
    }

    if (typeof document === 'undefined' || !isMounted) {
        return null;
    }

    return createPortal(
        <>
            <div
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...fadeProps}
            />
            <div
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...containerProps}
            >
                {children}
            </div>
        </>,
        document.body
    );
}
