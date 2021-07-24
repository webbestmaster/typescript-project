import {StrictMode} from 'react';

import {SystemProvider} from '../../provider/system/system-context';
import {LocaleProvider} from '../../provider/locale/locale-context';

type PropsType = {
    children: Array<JSX.Element> | JSX.Element;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children} = props;

    return (
        <StrictMode>
            <SystemProvider>
                <LocaleProvider>{children}</LocaleProvider>
            </SystemProvider>
        </StrictMode>
    );
}
