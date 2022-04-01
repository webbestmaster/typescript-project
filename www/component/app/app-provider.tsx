import {ReactNode} from 'react';

import {LocalizationProvider} from '../../provider/locale/locale-context';
import {ServerData} from '../../provider/server-data/server-data-context';
import {ServerDataContextType} from '../../provider/server-data/server-data-context-type';
import {User} from '../../provider/user/user-context';

type PropsType = {
    children: ReactNode;
    serverData: ServerDataContextType;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children, serverData} = props;

    return (
        <ServerData defaultServerData={serverData}>
            <User>
                <LocalizationProvider>{children}</LocalizationProvider>
            </User>
        </ServerData>
    );
}
