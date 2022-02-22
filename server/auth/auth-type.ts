import {UserRoleEnum} from '../../www/provider/user/user-context-type';

export type AuthUserType = Readonly<{
    readonly id: string;
    readonly login: string;
    readonly role: UserRoleEnum;
}>;

export type AuthUserFullType = Readonly<AuthUserType & {readonly password: string}>;
