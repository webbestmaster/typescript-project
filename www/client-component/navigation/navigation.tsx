import {useCallback, useContext} from 'react';
import {Link} from 'react-router-dom';

import {getArticleLinkToViewClient} from '../article/article-helper';

import {NavigationContextType, NavigationItemType} from './navigation-context/navigation-context-type';
import {navigationContext} from './navigation-context/navigation-context';

export function Navigation(): JSX.Element {
    const navigationContextData = useContext<NavigationContextType>(navigationContext);

    const {itemList} = navigationContextData;

    const renderNavigationListItem = useCallback((menuItem: NavigationItemType, index: number): JSX.Element => {
        const {slug, title} = menuItem;

        return (
            <Link key={`${slug}-${String(index)}`} to={getArticleLinkToViewClient(slug)}>
                {title}
            </Link>
        );
    }, []);

    return (
        <div>
            <h1>Navigation</h1>

            {itemList.map(renderNavigationListItem)}
        </div>
    );
}
