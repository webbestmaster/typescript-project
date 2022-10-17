import {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';

import {copyrightName} from '../../const';
import {appRoute} from '../../component/app/app-route';
import {Navigation} from '../navigation/navigation';
import {classNames} from '../../util/css';

import headerStyle from './header.scss';

export function Header(): JSX.Element {
    const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
    const toggleNavigation = useCallback(() => {
        setIsNavigationOpen((isOpen: boolean): boolean => !isOpen);
    }, []);

    return (
        <>
            <header className={headerStyle.header} key="header">
                <button
                    className={
                        isNavigationOpen
                            ? headerStyle.header__navigation_toggle_button__open
                            : headerStyle.header__navigation_toggle_button__closed
                    }
                    onClick={toggleNavigation}
                    type="button"
                >
                    &nbsp;
                </button>
                <Link className={headerStyle.header__home_link} to={appRoute.root.path}>
                    <img
                        alt={copyrightName}
                        className={headerStyle.header__home_icon}
                        src="https://placekitten.com/72/72"
                    />
                    <span className={headerStyle.header__home_text}>{copyrightName}</span>
                </Link>
                <div className={headerStyle.header__search}>&nbsp;</div>
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
