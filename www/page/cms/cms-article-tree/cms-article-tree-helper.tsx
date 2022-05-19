import {DataNode} from 'rc-tree/lib/interface';
import {Typography} from 'antd';

import {rootArticleId} from '../../../../server/article/article-const';
import {getArticleLinkToEdit} from '../cms-article/cms-article-helper';
import {getTickCross} from '../../../util/string';

import {ArticleForTreeType} from './cms-article-tree-type';

const {Link, Text} = Typography;

export function getArticleForTreeById(
    articleList: Array<ArticleForTreeType>,
    articleId: string
): ArticleForTreeType | null {
    const foundedArticle: ArticleForTreeType | void = articleList.find((article: ArticleForTreeType): boolean => {
        return article.id === articleId;
    });

    return foundedArticle || null;
}

function populateChildren(
    parentArticleId: string,
    articleList: Array<ArticleForTreeType>,
    deep: number
): Array<DataNode> {
    if (deep === 0) {
        return [];
    }

    const article: ArticleForTreeType | null = getArticleForTreeById(articleList, parentArticleId);

    if (!article) {
        return [];
    }

    const {subDocumentIdList} = article;

    const children: Array<DataNode> = subDocumentIdList.map<DataNode>((articleId: string): DataNode => {
        const childArticle: ArticleForTreeType | null = getArticleForTreeById(articleList, articleId);

        const urlToEdit = getArticleLinkToEdit(articleId);

        if (!childArticle) {
            return {
                key: articleId,
                title: (
                    <Link href={urlToEdit}>
                        <Text type="danger">[ERROR]: can NOT find article by id: {articleId}</Text>
                    </Link>
                ),
            };
        }

        const {title, slug, isActive, articleType} = childArticle;

        const titleNode = (
            <>
                <Link>{title}</Link>
                {' | '}
                <Link href={urlToEdit}>{slug}</Link>
                {' | '}
                <Text>
                    {articleType} {getTickCross(isActive)}
                </Text>
            </>
        );

        return {
            children: populateChildren(articleId, articleList, deep - 1),
            key: articleId,
            title: titleNode,
        };
    });

    return children;
}

export function makeArticleTree(articleList: Array<ArticleForTreeType>): DataNode {
    return {
        children: populateChildren(rootArticleId, articleList, 10),
        key: rootArticleId,
        title: <Link href={getArticleLinkToEdit(rootArticleId)}>{rootArticleId}</Link>,
    };
}

export function getArticleWithoutParentList(articleList: Array<ArticleForTreeType>): Array<ArticleForTreeType> {
    return articleList.filter((articleCandidate: ArticleForTreeType): boolean => {
        return !articleList.some((articleInList: ArticleForTreeType): boolean => {
            return articleInList.subDocumentIdList.includes(articleCandidate.id);
        });
    });
}

export function getArticleWithLostChildList(articleList: Array<ArticleForTreeType>): Array<ArticleForTreeType> {
    return articleList.filter((articleCandidate: ArticleForTreeType): boolean => {
        const {subDocumentIdList} = articleCandidate;

        return subDocumentIdList.some((articleId: string): boolean => !getArticleForTreeById(articleList, articleId));
    });
}
