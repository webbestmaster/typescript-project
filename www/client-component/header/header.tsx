import {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';

import {copyrightName} from '../../const';
import {appRoute} from '../../component/app/app-route';
import {Navigation} from '../navigation/navigation';
import {classNames} from '../../util/css';
import {Search} from '../search/search';

import headerStyle from './header.scss';

export function Header(): JSX.Element {
    const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
    const toggleNavigation = useCallback(() => {
        setIsNavigationOpen((isOpen: boolean): boolean => !isOpen);
    }, []);

    const [hasSearchFocus, setHasSearchFocus] = useState<boolean>(false);

    return (
        <>
            <header className={headerStyle.header}>
                <button
                    className={classNames({
                        [headerStyle.header__navigation_toggle_button__open]: isNavigationOpen,
                        [headerStyle.header__navigation_toggle_button__closed]: !isNavigationOpen,
                        [headerStyle.header__navigation_toggle_button__search_focused]: hasSearchFocus,
                    })}
                    onClick={toggleNavigation}
                    type="button"
                >
                    &nbsp;
                </button>
                <Link
                    className={classNames(headerStyle.header__home_link, {
                        [headerStyle.header__header__home_link__search_focused]: hasSearchFocus,
                    })}
                    to={appRoute.root.path}
                >
                    <img
                        alt={copyrightName}
                        className={headerStyle.header__home_icon}
                        src="https://placekitten.com/72/72"
                    />
                    <span className={headerStyle.header__home_text}>{copyrightName}</span>
                </Link>
                <div
                    className={classNames(headerStyle.header__search, {
                        [headerStyle.header__search__focused]: hasSearchFocus,
                    })}
                >
                    <Search onChangeFocus={setHasSearchFocus} />
                </div>
            </header>
            <div
                className={classNames(headerStyle.header__navigation_wrapper, {
                    [headerStyle.header__navigation_wrapper__open]: isNavigationOpen,
                })}
            >
                <Navigation />
            </div>
        </>
    );
}
