import {AuthUserType} from './auth-type';

export async function login(authUserLogin: string, authUserPassword: string): Promise<AuthUserType | null> {
    console.log(authUserLogin, authUserPassword);
    return null;
}
