import {
    NavigationContextType,
    NavigationItemType,
} from '../../../www/layout/navigation/navigation-context/navigation-context-type';
import {
    navigationReplaceSelectorBegin,
    navigationReplaceSelectorEnd,
    navigationSsrFieldName,
} from '../../../www/layout/navigation/navigation-const';
import {getSubDocumentListByParentIdFiltered} from '../../article/article-util';
import {rootArticleId} from '../../article/article-const';
import {ArticleType} from '../../article/article-type';

export async function getNavigationContextData(): Promise<[NavigationContextType, string]> {
    const articleList = await getSubDocumentListByParentIdFiltered(rootArticleId);

    const navigationData: NavigationContextType = {
        itemList: articleList.map<NavigationItemType>((article: ArticleType): NavigationItemType => {
            return {
                href: article.slug,
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
