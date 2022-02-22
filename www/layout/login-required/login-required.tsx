import {useUserContext} from '../../provider/user/user-context';
import {Login} from '../../page/login/login';

type PropsType = {
    children: JSX.Element;
};

export function LoginRequired(props: PropsType): JSX.Element {
    const {children} = props;
    const {user} = useUserContext();

    return user.id === '' ? <Login /> : children;
}
