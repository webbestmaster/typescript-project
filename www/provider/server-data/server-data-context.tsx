import {createContext} from 'react';

import {ServerDataContextType} from './server-data-context-type';
import {defaultServerDataContextConst} from './server-data-context-const';

export const ServerDataContext = createContext<ServerDataContextType>(defaultServerDataContextConst);

const {Provider: ServerDataProvider} = ServerDataContext;

type PropsType = {
    children: Array<JSX.Element> | JSX.Element;
    defaultServerData: ServerDataContextType;
};

export function ServerData(props: PropsType) {
    const {children, defaultServerData} = props;

    return <ServerDataProvider value={defaultServerData}>{children}</ServerDataProvider>;
}
