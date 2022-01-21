import {useUserContext} from '../../provider/user/user-context';
import {UserRoleEnum} from '../../provider/user/user-context-type';
import {Login} from '../../page/login/login';

type PropsType = {
    children: JSX.Element;
};

export function LoginRequired(props: PropsType): JSX.Element {
    const {children} = props;
    const {user} = useUserContext();

    return user.role === UserRoleEnum.guest ? <Login /> : children;
}
