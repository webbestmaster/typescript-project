import {NavigationContextType} from '../../../www/layout/navigation/navigation-context/navigation-context-type';
import {
    navigationReplaceSelectorBegin,
    navigationReplaceSelectorEnd,
    navigationSsrFieldName,
} from '../../../www/layout/navigation/navigation-const';

export async function getNavigationContextData(): Promise<[NavigationContextType, string]> {
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

    const navigationDataHtmlString: string = [
        navigationReplaceSelectorBegin,
        `window.${navigationSsrFieldName} = ${JSON.stringify(navigationData)}`,
        navigationReplaceSelectorEnd,
    ].join('');

    return [navigationData, navigationDataHtmlString];
}
