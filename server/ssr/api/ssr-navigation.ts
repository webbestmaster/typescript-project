import {
    NavigationContextType,
    NavigationItemType,
} from '../../../www/client-component/navigation/navigation-context/navigation-context-type';
import {
    navigationReplaceSelectorBegin,
    navigationReplaceSelectorEnd,
    navigationSsrFieldName,
} from '../../../www/client-component/navigation/navigation-const';
import {getSubDocumentListByParentIdFiltered} from '../../article/article-util';
import {rootArticleId} from '../../article/article-const';
import {ArticleType} from '../../article/article-type';

export async function getNavigationContextData(): Promise<[NavigationContextType, string]> {
    const articleList = await getSubDocumentListByParentIdFiltered(rootArticleId);

    const navigationData: NavigationContextType = {
        itemList: articleList
            .filter<ArticleType>((article: ArticleType): article is ArticleType => article.isActive)
            .map<NavigationItemType>((article: ArticleType): NavigationItemType => {
                return {
                    slug: article.slug,
                    title: article.title,
                };
            }),
    };

    const navigationDataHtmlString: string = [
        navigationReplaceSelectorBegin,
        `window.${navigationSsrFieldName} = ${JSON.stringify(navigationData)}`,
        navigationReplaceSelectorEnd,
    ].join('');

    return [navigationData, navigationDataHtmlString];
}
