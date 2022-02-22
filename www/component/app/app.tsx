import {ServerDataContextType} from '../../provider/server-data/server-data-context-type';

import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export type AppPropsServerType = {
    defaultRoutingPathname: string;
};

export type AppPropsType = {
    server: AppPropsServerType;
    serverData: ServerDataContextType;
};

export function App(props: AppPropsType): JSX.Element {
    const {server, serverData} = props;

    return (
        <AppProvider serverData={serverData}>
            <AppRouting server={server} />
        </AppProvider>
    );
}
