import {NavigationContextType} from '../../../www/layout/navigation/navigation-context/navigation-context-type';

export async function getNavigationContextData(): Promise<NavigationContextType> {
    const navigationData: NavigationContextType = {
        itemList: [
            {
                href: '/',
                title: 'ssr',
            },
            {
                href: '/22',
                title: 'home',
            },
        ],
    };

    return navigationData;
}
