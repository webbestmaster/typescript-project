/* global window, clearTimeout */

import {ReactNode, useEffect, useRef, useState} from 'react';

type PopupPropsType = {
    children: ReactNode;
    isOpen: boolean;
};

enum VisibleStateEnum {
    closed = 'closed',
    closing = 'closing',
    open = 'open',
    opening = 'opening',
}

export function Popup(props: PopupPropsType): JSX.Element | null {
    const {isOpen = false, children} = props;

    const [isSelfOpen, setIsSelfOpen] = useState<boolean>(false);
    const timeOutRef = useRef<number>(Number.NaN);

    const visibleState: VisibleStateEnum = (() => {
        if (isOpen === isSelfOpen) {
            return isSelfOpen ? VisibleStateEnum.open : VisibleStateEnum.closed;
        }

        return isOpen ? VisibleStateEnum.opening : VisibleStateEnum.closing;
    })();

    const infoState = [
        `Popup - isOpen: ${String(isOpen)}`,
        `Popup - isSelfOpen: ${String(isSelfOpen)}`,
        `Popup - visibleState: ${String(visibleState)}`,
    ].join('\n');

    console.info(`%c${infoState}`, 'font-size: 24px');

    useEffect(() => {
        return () => {
            clearTimeout(timeOutRef.current);
        };
    }, []);

    useEffect(() => {
        clearTimeout(timeOutRef.current);

        if (isOpen === isSelfOpen) {
            return;
        }

        timeOutRef.current = window.setTimeout(() => {
            setIsSelfOpen(isOpen);
        }, 1e3);
    }, [isOpen, isSelfOpen, timeOutRef]);

    if (visibleState === VisibleStateEnum.closed) {
        return null;
    }

    return (
        <div>
            {children} {visibleState}
        </div>
    );
}
