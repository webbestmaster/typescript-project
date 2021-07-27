import {StrictMode} from 'react';

import {LocalizationProvider} from '../../provider/locale/locale-context';

type PropsType = {
    children: Array<JSX.Element> | JSX.Element;
};

export function AppProvider(props: PropsType): JSX.Element {
    const {children} = props;

    return (
        <StrictMode>
            <LocalizationProvider>{children}</LocalizationProvider>
        </StrictMode>
    );
}
