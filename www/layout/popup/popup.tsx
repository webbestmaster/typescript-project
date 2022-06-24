/* global document, setTimeout, clearTimeout, NodeJS */

import {ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

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
    const transitionTime = 1e3;
    const {isOpen = false, children} = props;

    const [isSelfOpen, setIsSelfOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timeOutRef = useRef<NodeJS.Timeout | number>(Number.NaN);

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

    if (visibleState === VisibleStateEnum.closed) {
        return null;
    }

    if (typeof document === 'undefined' || isMounted === false) {
        return null;
    }

    return createPortal(
        <div>
            {children} {visibleState}
        </div>,
        document.body
    );
}
