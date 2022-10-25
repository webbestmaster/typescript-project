/* global window, requestAnimationFrame, sessionStorage */

import {useEffect, useState, useCallback} from 'react';
import {useLocation} from 'react-router';

import {debounce} from '../../util/function';
import {classNames} from '../../util/css';

import {getAbsoluteScrollTop, getRelativeScrollTop, handleScrollToTop} from './scroll-restoration-helper';
import scrollRestorationStyle from './scroll-restoration.scss';

export function ScrollRestoration(): JSX.Element {
    const topScrollPositionToShowToTopButton = 100;
    const {pathname} = useLocation();
    const [scrollTop, setScrollTop] = useState<number>(0);
    const getItemKey = useCallback((): string => 'ScrollRestoration:' + pathname, [pathname]);

    useEffect(() => {
        const {documentElement} = window.document;
        const relativeScrollTop = Number.parseFloat(sessionStorage.getItem(getItemKey()) || '0') || 0;
        const absoluteScrollTop = getAbsoluteScrollTop(relativeScrollTop);

        requestAnimationFrame(() => {
            documentElement.scrollTop = absoluteScrollTop;

            requestAnimationFrame(() => {
                documentElement.scrollTop = absoluteScrollTop;
            });
        });
    }, [getItemKey]);

    useEffect(() => {
        const debouncedChangeScrollTopPosition = debounce<[]>(() => {
            const {documentElement} = window.document;

            sessionStorage.setItem(getItemKey(), getRelativeScrollTop().toString(10));

            setScrollTop(documentElement.scrollTop);
        }, 150);

        window.addEventListener('scroll', debouncedChangeScrollTopPosition, {
            capture: false,
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', debouncedChangeScrollTopPosition);
        };
    }, [getItemKey]);

    return (
        <button
            className={classNames(scrollRestorationStyle.scroll_restoration__scroll_to_top_button, {
                [scrollRestorationStyle.scroll_restoration__scroll_to_top_button__visible]:
                    scrollTop > topScrollPositionToShowToTopButton,
            })}
            onClick={handleScrollToTop}
            type="button"
        >
            <span className={scrollRestorationStyle.scroll_restoration__scroll_to_top_button__arrow} />
        </button>
    );
}
