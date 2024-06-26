import fileSystem from "node:fs/promises";
import path from "node:path";
import {cwd} from "node:process";

import type {FastifyReply, FastifyRequest} from "fastify";

import {specialFileNameList} from "../../www/const";
import {articleCrud} from "../article/article";
import type {ArticleType} from "../article/article-type";
import {getIsFileInArticle} from "../article/article-util";
import {mainResponseHeader} from "../const";
import {uploadFileFolder} from "./file-const";

export interface GetExtraFilesType {
    actualSpecialFileList: Array<string>;
    expectedSpecialFileList: Array<string>;
    extraFileList: Array<string>;
}

export async function removeExtraStaticFiles(request: FastifyRequest, reply: FastifyReply): Promise<GetExtraFilesType> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({});

    const actualSpecialFileList: Array<string> = [];
    const fileNameList: Array<string> = await fileSystem.readdir(path.join(cwd(), uploadFileFolder));
    const extraFileList: Array<string> = [];

    fileNameList.forEach((fileName: string) => {
        if (specialFileNameList.includes(fileName)) {
            actualSpecialFileList.push(fileName);
            return;
        }

        const isFileInArticle = articleList.some((article: ArticleType): boolean => {
            return getIsFileInArticle(fileName, article);
        });

        if (isFileInArticle) {
            return;
        }

        console.warn("[WARNING] >>> to remove file, uncomment next line");
        // ignored fileSystem.unlink(path.join(cwd, uploadFileFolder, fileName));

        extraFileList.push(fileName);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reply.code(200).header(...mainResponseHeader);

    return {
        actualSpecialFileList: actualSpecialFileList.sort(),
        expectedSpecialFileList: specialFileNameList.sort(),
        extraFileList: extraFileList.sort(),
    };
}
