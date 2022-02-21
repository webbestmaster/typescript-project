/* global process */

import path from 'path';

import sqlite3Import from 'sqlite3';

import {PromiseResolveType} from '../../www/util/promise';

import {AuthUserType} from './auth-type';
import {getSha256Hash} from './auth-helper';

const sqlite3 = sqlite3Import.verbose();
const cwd = process.cwd();

const pathToUserDataBase: string = path.join(cwd, 'user-db');

const database = new sqlite3.Database(pathToUserDataBase);

export function initializeUserDataBase() {
    database.serialize(() => {
        database.run('DROP TABLE IF EXISTS user');

        database.run('CREATE TABLE IF NOT EXISTS user (login TEXT NOT NULL UNIQUE, password TEXT NOT NULL)');

        database.run('INSERT INTO user (login, password) VALUES (?, ?)', ['my_login', getSha256Hash('my_password')]);

        database.run('INSERT INTO user (login, password) VALUES (?, ?)', [
            'my_login_2',
            getSha256Hash('my_password_2'),
        ]);
    });

    // database.close();
}

export function findUserByLogin(authUserLogin: string): Promise<AuthUserType | null> {
    return new Promise<AuthUserType | null>((resolve: PromiseResolveType<AuthUserType | null>) => {
        database.get(
            'SELECT login FROM user WHERE login = ?',
            [authUserLogin],
            (error: Error | null, row?: AuthUserType) => {
                if (error) {
                    console.log('findUserByLogin: error');
                    resolve(null);
                    return;
                }

                const foundAuthUserLogin: string = String(row ? row.login : '').trim();

                if (foundAuthUserLogin === '') {
                    console.log('findUserByLogin: login is empty');
                    resolve(null);
                    return;
                }

                resolve({login: foundAuthUserLogin});
            }
        );
    });
}

(async () => {
    console.log(await findUserByLogin('my_login'));
    console.log(await findUserByLogin('my_login_2'));
    console.log(await findUserByLogin('my_login_2'));
    console.log(await findUserByLogin('my_login_2'));
    console.log(await findUserByLogin('my_login_2'));
})();
