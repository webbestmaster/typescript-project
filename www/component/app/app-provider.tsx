import {ReactNode, StrictMode} from 'react';

import {LocalizationProvider} from '../../provider/locale/locale-context';
import {ServerData} from '../../provider/server-data/server-data-context';
import {ServerDataContextType} from '../../provider/server-data/server-data-context-type';

type PropsType = {
    children: ReactNode;
    serverData: ServerDataContextType;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children, serverData} = props;

    return (
        <StrictMode>
            <ServerData defaultServerData={serverData}>
                <LocalizationProvider>{children}</LocalizationProvider>
            </ServerData>
        </StrictMode>
    );
}
