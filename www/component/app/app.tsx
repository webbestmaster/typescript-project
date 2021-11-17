import {AppProvider} from './app-provider';
import {AppRouting} from './app-routing';

export type AppPropsType = {
    server: {
        defaultRoutingPathname: string;
    };
};

export function App(props: AppPropsType): JSX.Element {
    const {server} = props;

    return (
        <AppProvider>
            <AppRouting server={server} />
        </AppProvider>
    );
}
