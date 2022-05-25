// eslint-disable-next-line max-len
import {NavigationContextType} from '../../../www/client-component/navigation/navigation-context/navigation-context-type';
import {
    navigationReplaceSelectorBegin,
    navigationReplaceSelectorEnd,
    navigationSsrFieldName,
} from '../../../www/client-component/navigation/navigation-const';
import {articleToArticlePreview, getSubDocumentListByParentIdFiltered} from '../../article/article-util';
import {rootArticleId} from '../../article/article-const';
import {ArticlePreviewType} from '../../article/article-type';
import {getIsActiveArticlePreview} from '../../article/article-client-api';

export async function getNavigationContextData(): Promise<[NavigationContextType, string]> {
    const articleList = await getSubDocumentListByParentIdFiltered(rootArticleId);

    const navigationData: NavigationContextType = {
        itemList: articleList
            .map<ArticlePreviewType>(articleToArticlePreview)
            .filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };

    const navigationDataHtmlString: string = [
        navigationReplaceSelectorBegin,
        `window.${navigationSsrFieldName} = '${JSON.stringify(navigationData)}'`,
        navigationReplaceSelectorEnd,
    ].join('');

    return [navigationData, navigationDataHtmlString];
}
