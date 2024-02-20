import {createContext, useMemo, useState, useContext, useEffect, type ReactNode} from "react";

import {getAutoAuthLogin} from "../../service/auth/auth-api";
import {useMakeExecutableState} from "../../util/function";
import type {LoginResponseType} from "../../service/auth/auth-type";
import {throwError} from "../../util/error";

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
        // A if ( typeof location === "object" && location.pathname.includes("/cms/")) {
        executeAutoLogin()
            .then((loginResponse: LoginResponseType) => {
                setUser(loginResponse.user);
            })
            .catch(throwError);
        // }
    }, [executeAutoLogin]);

    return <UserContextProvider value={providedData}>{children}</UserContextProvider>;
}
