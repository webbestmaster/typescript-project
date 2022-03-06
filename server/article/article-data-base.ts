/* global process */

import path from 'path';

import sqlite3Import, {Database} from 'sqlite3';

import {PromiseResolveType} from '../../www/util/promise';
import {createFindCallback, createRunCallBack, DataBaseValueType} from '../util/data-base';
import {getRandomStringHash} from '../util/string';
import {GetListPaginationArgumentType, GetListPaginationResultType} from '../util/type';

import {ArticleDataBaseType, ArticleFullDefinedType} from './article-type';
import {dataBaseToFullDefinedArticle, fullDefinedToDataBaseArticle} from './article-helper';

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

    /*
    (async () => {
        console.log(
            await updateArticleById(
                'a4a9732fa4ee77b4',
                {
                    content: 'aaddasasd',
                    artistList: ['asdsa', 'фывыфвф'],
                }
            )
        );
    })();
*/

    /*
        (async () => {
            console.log(await findArticleBySlug('slug-1'))
        })();
        (async () => {
            console.log(dataBaseToFullDefinedArticle(await findArticleById('a4a9732fa4ee77b4')))
        })();
*/

    const fieldsInitialization = [
        'articleType TEXT', // type: ArticleTypeEnum;
        'artistList TEXT', // artistList: Array<string>;
        'authorList TEXT', // authorList: Array<string>;
        'compositorList TEXT', // compositorList: Array<string>;
        'content TEXT', // content: string;
        'createdDate TEXT', // createdDate: string;
        'description TEXT', // description: string;
        'directorList TEXT', // directorList: Array<string>;
        'fileList TEXT', // fileList: Array<string>;
        'hasMetaRobotsFollowSeo INTEGER', // hasMetaRobotsFollowSeo: boolean; // Add/combine <meta name="robots" content="nofollow"/>
        'hasMetaRobotsNoIndexSeo INTEGER', // hasMetaRobotsNoIndexSeo: boolean; // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        'id TEXT NOT NULL UNIQUE', // id: string;
        'illustratorList TEXT', // illustratorList: Array<string>;
        'isActive INTEGER', // isActive: boolean; // actually temporary "removed"
        'isInSiteMapXmlSeo INTEGER', // isInSiteMapXmlSeo: boolean; // has sitemap.xml link to article on not
        'metaDescriptionSeo TEXT', // metaDescriptionSeo: string; // tag <meta type="description" content="....." />
        'metaSeo TEXT', // metaSeo: string; // actually any html code
        'publishDate TEXT', // publishDate: string;
        'readerList TEXT', // readerList: Array<string>;
        'shortDescription TEXT', // shortDescription: string;
        'slug TEXT NOT NULL UNIQUE', // slug: string;
        'subDocumentIdList TEXT', // subDocumentIdList: Array<string>;
        'subDocumentListViewType TEXT', // subDocumentListViewType: SubDocumentListViewTypeEnum;
        'tagList TEXT', // tags: Array<string>;
        'tagTitleSeo TEXT', // tagTitleSeo: string; // tag <title>....</title>
        'title TEXT', // title: string;
        'titleImage TEXT', // titleImage: string;
        'updatedDate TEXT', // updatedDate: string;
    ].join(', ');

    dataBase.run(`CREATE TABLE IF NOT EXISTS article (${fieldsInitialization})`);
}

export function findArticleById(articleId: string): Promise<ArticleDataBaseType | null> {
    return new Promise<ArticleDataBaseType | null>((resolve: PromiseResolveType<ArticleDataBaseType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM article WHERE id = $id',
            {$id: articleId},
            createFindCallback<ArticleDataBaseType>(resolve)
        );
    });
}

export function findArticleBySlug(articleSlug: string): Promise<ArticleDataBaseType | null> {
    return new Promise<ArticleDataBaseType | null>((resolve: PromiseResolveType<ArticleDataBaseType | null>) => {
        const dataBase = getDataBase();

        dataBase.get(
            'SELECT * FROM article WHERE slug = $slug',
            {$slug: articleSlug},
            createFindCallback<ArticleDataBaseType>(resolve)
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

// throw error is failed
export async function updateArticleById(
    articleId: string,
    partialDefinedArticle: Partial<ArticleFullDefinedType>
): Promise<void> {
    const existedDataBaseArticle: ArticleDataBaseType | null = await findArticleById(articleId);

    if (!existedDataBaseArticle) {
        throw new Error(`[updateArticleById]: Can not update article by id: ${articleId}`);
    }

    const existedFullDefinedArticle: ArticleFullDefinedType = dataBaseToFullDefinedArticle(existedDataBaseArticle);

    const newFullDefinedArticle: ArticleFullDefinedType = {
        ...existedFullDefinedArticle,
        ...partialDefinedArticle,
    };

    const newDataBaseArticle: ArticleDataBaseType = fullDefinedToDataBaseArticle(newFullDefinedArticle);

    const keyValueDataList = Object.entries<DataBaseValueType>(newDataBaseArticle).filter(
        (data: [string, unknown]): boolean => data[0] !== 'id'
    );

    const sqlKeyString: string = keyValueDataList
        .map((data: [string, DataBaseValueType]): string => `${data[0]} = ?`)
        .join(', ');

    const valueList: Array<unknown> = keyValueDataList.map(
        (data: [string, DataBaseValueType]): DataBaseValueType => data[1]
    );

    return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        const dataBase = getDataBase();

        dataBase.run(
            `UPDATE article SET ${sqlKeyString} WHERE id = ?`,
            [...valueList, articleId],
            createRunCallBack(resolve, reject)
        );
    });
}

export function getArticleList(
    pagination: GetListPaginationArgumentType
): Promise<GetListPaginationResultType<ArticleDataBaseType>> {
    return new Promise<GetListPaginationResultType<ArticleDataBaseType>>(
        (
            resolve: PromiseResolveType<GetListPaginationResultType<ArticleDataBaseType>>,
            reject: PromiseResolveType<Error>
        ) => {
            // const dataBase = getDataBase();

            console.log(reject);

            resolve({
                ...pagination,
                allItemCount: 0,
                itemList: [],
            });
        }
    );
}
