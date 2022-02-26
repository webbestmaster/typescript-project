/* global process */

import path from 'path';

import sqlite3Import, {Database} from 'sqlite3';

import {PromiseResolveType} from '../../www/util/promise';
import {UserRoleEnum} from '../../www/provider/user/user-context-type';

import {AuthUserFullType} from './auth-type';
import {createFindUserCallback, createRunCallBack, getRandomStringHash, getSha256Hash} from './auth-helper';

const cwd = process.cwd();

const pathToUserDataBase: string = path.join(cwd, 'server', 'auth', 'user-db');

export const getDataBase: () => Database = (() => {
    const sqlite3 = sqlite3Import.verbose();
    const sqlite3Database: Database = new sqlite3.Database(pathToUserDataBase);

    return (): Database => sqlite3Database;
})();

export function initializeUserDataBase() {
    const dataBase = getDataBase();

    // dataBase.run('DROP TABLE IF EXISTS user');

    // createUser('login_1', 'password_2');
    // createUser('login_2', 'password_2');
    // createUser('login_3', 'password_2');
    // createUser('login_4', 'password_2');
    // createUser('login_5', 'password_2');

    dataBase.run(
        'CREATE TABLE IF NOT EXISTS user ' +
            '(id TEXT NOT NULL UNIQUE, login TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT NOT NULL)'
    );
}

// return user's data or null
export function findUserByLogin(authUserLogin: string): Promise<AuthUserFullType | null> {
    return new Promise<AuthUserFullType | null>((resolve: PromiseResolveType<AuthUserFullType | null>) => {
        const dataBase = getDataBase();

        dataBase.get('SELECT * FROM user WHERE login = ?', [authUserLogin], createFindUserCallback(resolve));
    });
}

// return user's data or null
export function findUserByCredentials(
    authUserLogin: string,
    authUserPassword: string
): Promise<AuthUserFullType | null> {
    return new Promise<AuthUserFullType | null>((resolve: PromiseResolveType<AuthUserFullType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM user WHERE login = ? AND password = ?',
            [authUserLogin, getSha256Hash(authUserPassword)],
            createFindUserCallback(resolve)
        );
    });
}

// return user's data or null
export function findUserById(authUserId: string): Promise<AuthUserFullType | null> {
    return new Promise<AuthUserFullType | null>((resolve: PromiseResolveType<AuthUserFullType | null>) => {
        const dataBase = getDataBase();

        dataBase.get('SELECT * FROM user WHERE id = ?', [authUserId], createFindUserCallback(resolve));
    });
}

// throw error is failed
export function createUser(newUserLogin: string, newUserPassword: string): Promise<void> {
    return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        const dataBase = getDataBase();
        const id = getRandomStringHash(16);

        dataBase.run(
            'INSERT INTO user (id, login, password, role) VALUES (?, ?, ?, ?)',
            [id, newUserLogin, getSha256Hash(newUserPassword), UserRoleEnum.user],
            createRunCallBack(resolve, reject)
        );
    });
}
