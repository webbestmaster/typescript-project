import {useCallback, useState, type SyntheticEvent} from "react";

import {useUserContext} from "../../../provider/user/user-context";
import {useMakeExecutableState} from "../../../util/function";
import {loginUser, logoutUser} from "../../../service/auth/auth-api";
import type {LoginResponseType} from "../../../service/auth/auth-type";
import {throwError} from "../../../util/error";
import {apiUrl} from "../../../../server/const";

export function LoginForm(): JSX.Element {
    const userContext = useUserContext();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const loginHook = useMakeExecutableState<Parameters<typeof loginUser>, LoginResponseType>(loginUser);
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

    const onSubmit = useCallback(
        (evt: SyntheticEvent<HTMLFormElement>) => {
            evt.preventDefault();

            loginHook
                .execute(login, password)
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    userContext.setUser(user);
                })
                .catch(throwError);
        },
        [login, password, loginHook, userContext]
    );

    if (userContext.user.login !== "") {
        return (
            <div>
                <p>you are logged in, the login is &quot;{userContext.user.login}&quot;</p>
                <button onClick={onHandleLogout} type="button">
                    logout
                </button>
            </div>
        );
    }

    return (
        <form action={apiUrl.login} onSubmit={onSubmit}>
            <pre>{JSON.stringify(userContext, null, 4)}</pre>
            <pre>{JSON.stringify(loginHook, null, 4)}</pre>

            <label>
                <p>login</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                        setLogin(evt.currentTarget.value);
                    }}
                    placeholder="login"
                    type="text"
                />
            </label>
            <label>
                <p>password</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                        setPassword(evt.currentTarget.value);
                    }}
                    placeholder="password"
                    type="text"
                />
            </label>

            {loginHook.error ? <h3>ERROR login</h3> : "???"}

            <br />

            <button type="submit">submit</button>
        </form>
    );
}
