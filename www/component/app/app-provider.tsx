import {ReactNode} from 'react';

import {LocalizationProvider} from '../../provider/locale/locale-context';
import {User} from '../../provider/user/user-context';
import {NavigationProvider} from '../../layout/navigation/navigation-context/navigation-context';
import {NavigationContextType} from '../../layout/navigation/navigation-context/navigation-context-type';

type PropsType = {
    children: ReactNode;
    navigationData: NavigationContextType | null;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children, navigationData} = props;

    return (
        <User>
            <NavigationProvider navigationData={navigationData}>
                <LocalizationProvider>{children}</LocalizationProvider>
            </NavigationProvider>
        </User>
    );
}
