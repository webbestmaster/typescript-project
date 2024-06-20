import {createContext, type ReactNode, useContext, useEffect, useMemo, useState} from "react";

import {getAutoAuthLogin} from "../../service/auth/auth-api";
import type {LoginResponseType} from "../../service/auth/auth-type";
import {getIsNeedAutologin} from "../../service/auth/auth-util";
import {throwError} from "../../util/error";
import {useMakeExecutableState} from "../../util/function";
import {defaultUserContext} from "./user-context-const";
import type {UserContextType, UserType} from "./user-context-type";

export const UserContext = createContext<UserContextType>(defaultUserContext);

export function useUserContext(): UserContextType {
    return useContext<UserContextType>(UserContext);
}

const {Provider: UserContextProvider} = UserContext;

type UserProviderPropsType = Record<"children", ReactNode>;

export function UserProvider(props: UserProviderPropsType): JSX.Element {
    const {children} = props;

    const [user, setUser] = useState<UserType>(defaultUserContext.user);
    const {execute: executeAutoLogin, isInProgress: isInProgressAutoLogin} = useMakeExecutableState<
        Parameters<typeof getAutoAuthLogin>,
        LoginResponseType
    >(getAutoAuthLogin);

    const providedData: UserContextType = useMemo<UserContextType>(() => {
        return {isInProgressAutoLogin, setUser, user};
    }, [isInProgressAutoLogin, user]);

    useEffect(() => {
        if (getIsNeedAutologin()) {
            executeAutoLogin()
                .then((loginResponse: LoginResponseType) => {
                    setUser(loginResponse.user);
                })
                .catch(throwError);
        }
    }, [executeAutoLogin]);

    return <UserContextProvider value={providedData}>{children}</UserContextProvider>;
}
