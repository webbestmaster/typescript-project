import {useCallback, type SyntheticEvent} from "react";

import {useUserContext} from "../../../provider/user/user-context";
import {useMakeExecutableState} from "../../../util/function";
import {logoutUser} from "../../../service/auth/auth-api";
import type {LoginResponseType} from "../../../service/auth/auth-type";
import {throwError} from "../../../util/error";

export function LoginForm(): JSX.Element {
    const userContext = useUserContext();
    const logoutHook = useMakeExecutableState<Parameters<typeof logoutUser>, LoginResponseType>(logoutUser);

    const onHandleLogout = useCallback(
        (evt: SyntheticEvent<HTMLButtonElement>): void => {
            console.log(evt);
            evt.preventDefault();

            logoutHook
                .execute()
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    userContext.setUser(user);
                })
                .catch(throwError);
        },
        [logoutHook, userContext]
    );

    if (userContext.user.login !== "") {
        return (
            <div>
                <p>you are already logged in, the login is &quot;{userContext.user.login}&quot;</p>
                <button onClick={onHandleLogout} type="button">
                    logout
                </button>
            </div>
        );
    }

    return (
        <form>
            {JSON.stringify(userContext.user)}
            <input placeholder="login" type="text" />
            <hr />
            <input placeholder="password" type="password" />
            <hr />
            <button type="submit">submit</button>
        </form>
    );
}
