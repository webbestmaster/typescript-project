/* global process */

import path from 'path';

import sqlite3Import, {Database} from 'sqlite3';

import {PromiseResolveType} from '../../www/util/promise';
import {createFindCallback, createRunCallBack} from '../util/data-base';
import {getRandomStringHash} from '../util/string';

import {ArticleType} from './article-type';

const getDataBase: () => Database = (() => {
    const cwd = process.cwd();
    const pathToDataBase: string = path.join(cwd, 'server', 'article', 'article.sqlite3');
    const sqlite3 = sqlite3Import.verbose();
    const sqlite3Database: Database = new sqlite3.Database(pathToDataBase);

    return (): Database => sqlite3Database;
})();

export function initializeDataBase() {
    const dataBase = getDataBase();

    // dataBase.run('DROP TABLE IF EXISTS article');

    // createArticleBySlug('slug-1');
    // createArticleBySlug('slug-2');
    // createArticleBySlug('slug-3');

    const fieldsInitialization = [
        'id TEXT NOT NULL UNIQUE', // id: string;
        'artistList TEXT', // artistList: Array<string>;
        'authorList TEXT', // authorList: Array<string>;
        'compositorList TEXT', // compositorList: Array<string>;
        'content TEXT', // content: string;
        'createdDate TEXT', // createdDate: string;
        'description TEXT', // description: string;
        'directorList TEXT', // directorList: Array<string>;
        'fileList TEXT', // fileList: Array<string>;
        'hasMetaRobotsFollowSeo BOOLEAN', // hasMetaRobotsFollowSeo: boolean; // Add/combine <meta name="robots" content="nofollow"/>
        'hasMetaRobotsNoIndexSeo BOOLEAN', // hasMetaRobotsNoIndexSeo: boolean; // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        'illustratorList TEXT', // illustratorList: Array<string>;
        'isActive BOOLEAN', // isActive: boolean; // actually temporary "removed"
        'isInSiteMapXmlSeo BOOLEAN', // isInSiteMapXmlSeo: boolean; // has sitemap.xml link to article on not
        'metaDescriptionSeo TEXT', // metaDescriptionSeo: string; // tag <meta type="description" content="....." />
        'metaSeo TEXT', // metaSeo: string; // actually any html code
        'publishDate TEXT', // publishDate: string;
        'readerList TEXT', // readerList: Array<string>;
        'shortDescription TEXT', // shortDescription: string;
        'slug TEXT NOT NULL UNIQUE', // slug: string;
        'subDocumentIdList TEXT', // subDocumentIdList: Array<string>;
        'subDocumentListViewType TEXT', // subDocumentListViewType: SubDocumentListViewTypeEnum;
        'tagTitleSeo TEXT', // tagTitleSeo: string; // tag <title>....</title>
        'tags TEXT', // tags: Array<string>;
        'title TEXT', // title: string;
        'titleImage TEXT', // titleImage: string;
        'type TEXT', // type: ArticleTypeEnum;
        'updatedDate TEXT', // updatedDate: string;
    ].join(', ');

    dataBase.run(`CREATE TABLE IF NOT EXISTS article (${fieldsInitialization})`);
}

export function findArticleById(articleId: string): Promise<ArticleType | null> {
    return new Promise<ArticleType | null>((resolve: PromiseResolveType<ArticleType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM article WHERE id = $id',
            {$id: articleId},
            createFindCallback<ArticleType>(resolve)
        );
    });
}

export function findArticleBySlug(articleSlug: string): Promise<ArticleType | null> {
    return new Promise<ArticleType | null>((resolve: PromiseResolveType<ArticleType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM article WHERE slug = $slug',
            {$slug: articleSlug},
            createFindCallback<ArticleType>(resolve)
        );
    });
}

// throw error is failed
export function createArticleBySlug(slug: string): Promise<void> {
    return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        const dataBase = getDataBase();
        const id = getRandomStringHash(16);

        dataBase.run('INSERT INTO article (id, slug) VALUES (?, ?)', [id, slug], createRunCallBack(resolve, reject));
    });
}

/*
// return user's data or null
export function findUserByCredentials(
    authUserLogin: string,
    authUserPassword: string
): Promise<AuthUserFullType | null> {
    return new Promise<AuthUserFullType | null>((resolve: PromiseResolveType<AuthUserFullType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM user WHERE login = $login AND password = $password',
            {$login: authUserLogin, $password: getSha256Hash(authUserPassword)},
            createFindCallback<AuthUserFullType>(resolve)
        );
    });
}

// return user's data or null
export function findUserById(authUserId: string): Promise<AuthUserFullType | null> {
    return new Promise<AuthUserFullType | null>((resolve: PromiseResolveType<AuthUserFullType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM user WHERE id = $id',
            {$id: authUserId},
            createFindCallback<AuthUserFullType>(resolve)
        );
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
*/
