import {ArticlePreviewType, ArticleType} from './article-type';
import {articleCrud} from './article';

export function getArticleById(id: string): Promise<ArticleType | null> {
    return articleCrud.findOne({id});
}

export function getArticleBySlug(slug: string): Promise<ArticleType | null> {
    return articleCrud.findOne({slug});
}

export function articleToArticlePreview(article: ArticleType): ArticlePreviewType {
    const {articleType, fileList, slug, title, titleImage} = article;

    return {articleType, fileList, slug, title, titleImage};
}

export function getArticleListByIdList(idList: Array<string>): Promise<Array<ArticleType | null>> {
    return Promise.all(idList.map(getArticleById));
}

export async function getArticleListByIdListFiltered(idList: Array<string>): Promise<Array<ArticleType>> {
    return getArticleListByIdList(idList).then((data: Array<ArticleType | null>): Array<ArticleType> => {
        return data.filter<ArticleType>((mayBeArticle: ArticleType | null): mayBeArticle is ArticleType => {
            return mayBeArticle !== null;
        });
    });
}

// eslint-disable-next-line id-length
export async function getArticlePreviewListByIdListFiltered(idList: Array<string>): Promise<Array<ArticlePreviewType>> {
    const articlePreviewList = await getArticleListByIdListFiltered(idList);

    return articlePreviewList.map<ArticlePreviewType>(articleToArticlePreview);
}

export function getSubDocumentListFiltered(article: ArticleType): Promise<Array<ArticleType>> {
    const {subDocumentIdList} = article;

    return getArticleListByIdListFiltered(subDocumentIdList);
}

// eslint-disable-next-line id-length
export async function getSubDocumentListByParentIdFiltered(parentId: string): Promise<Array<ArticleType>> {
    const parent = await getArticleById(parentId);

    if (!parent) {
        return [];
    }

    return getSubDocumentListFiltered(parent);
}
