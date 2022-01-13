import {createContext, useMemo, useState, useContext} from 'react';

import {UserContextType, UserType} from './user-context-type';
import {defaultUserContext} from './user-context-const';

export const UserContext = createContext<UserContextType>(defaultUserContext);

export function useUserContext(): UserContextType {
    return useContext<UserContextType>(UserContext);
}

const {Provider: UserContextProvider} = UserContext;

type PropsType = {
    children: Array<JSX.Element> | JSX.Element;
};

export function User(props: PropsType): JSX.Element {
    const [user, setUser] = useState<UserType>(defaultUserContext.user);

    const providedData: UserContextType = useMemo<UserContextType>(() => {
        return {setUser, user};
    }, [user]);

    const {children} = props;

    return <UserContextProvider value={providedData}>{children}</UserContextProvider>;
}
