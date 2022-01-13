/* global HTMLFormElement, HTMLInputElement */
import {SyntheticEvent, useCallback, useState} from 'react';

import {UserRoleEnum} from '../../provider/user/user-context-type';
import {useUserContext} from '../../provider/user/user-context';
import {useMakeExecutableState} from '../../util/function';
import {LoginResponseType} from '../../service/auth/auth-type';
import {loginUser} from '../../service/auth/auth-api';
import {throwError} from '../../util/promise';

export function Login(): JSX.Element {
    const userContext = useUserContext();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const loginHook = useMakeExecutableState<[string, string], LoginResponseType>(loginUser);

    const onSubmit = useCallback(
        (evt: SyntheticEvent<HTMLFormElement>) => {
            evt.preventDefault();

            loginHook
                .execute(login, password)
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    userContext.setUser(user);
                })
                // `userContext.setUser({` added as mock data only
                .finally(() => {
                    userContext.setUser({
                        id: '123',
                        role: UserRoleEnum.guest,
                    });
                })
                .catch(throwError);
            // console.log({login, password});
            //
            // console.log('//');
        },
        [login, password, loginHook, userContext]
    );

    return (
        <form action="/login" onSubmit={onSubmit}>
            <pre>{JSON.stringify(userContext, null, 4)}</pre>
            <pre>{JSON.stringify(loginHook, null, 4)}</pre>

            <label>
                <p>login</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                        setLogin(evt.currentTarget.value);
                    }}
                    placeholder="login"
                    type="text"
                />
            </label>
            <label>
                <p>password</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>) => {
                        setPassword(evt.currentTarget.value);
                    }}
                    placeholder="password"
                    type="text"
                />
            </label>
            <br />
            <button type="submit">submit</button>
        </form>
    );
}
