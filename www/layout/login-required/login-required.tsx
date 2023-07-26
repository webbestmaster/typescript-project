import {useUserContext} from '../../provider/user/user-context';
import {LoginAsync} from '../../page/service/login/login-async';

type PropsType = {
    readonly children: JSX.Element;
};

export function LoginRequired(props: PropsType): JSX.Element {
    const {children} = props;
    const {user} = useUserContext();

    return user.id === '' ? <LoginAsync /> : children;
}
