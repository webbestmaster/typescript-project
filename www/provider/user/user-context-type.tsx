export enum UserRoleEnum {
    admin = 'admin',
    guest = 'guest',
}

export type UserType = {
    id: string;
    role: UserRoleEnum;
};

export type UserContextType = {
    setUser: (user: UserType) => void;
    user: UserType;
};
