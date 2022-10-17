import {useContext} from 'react';

import {Article} from '../../../client-component/article/article';
import {Breadcrumbs} from '../../../client-component/breadcrumbs/breadcrumbs';
import {Siblings} from '../../../client-component/siblings/siblings';
import {ShareButtonList} from '../../../client-component/share/share-button-list/share-button-list';
import {TopAdsWrapper} from '../../../client-component/ads/top-ads-wrapper/top-ads-wrapper';
import {BottomAdsWrapper} from '../../../client-component/ads/bottom-ads-wrapper/bottom-ads-wrapper';
import {Page} from '../../../client-component/page/page';
import {PageHeader} from '../../../client-component/page-header/page-header';
import {ArticleContextType} from '../../../client-component/article/article-context/article-context-type';
import {articleContext} from '../../../client-component/article/article-context/article-context';
import {Error404} from '../../service/error-404/error-404';

export function ClientArticle(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {title, id} = article;

    if (id === '') {
        return (
            <Page>
                <Error404 />
            </Page>
        );
    }

    return (
        <Page>
            <Breadcrumbs />
            <PageHeader>{title}</PageHeader>
            <TopAdsWrapper />
            <Article />
            <Siblings />
            <BottomAdsWrapper />
            <ShareButtonList />
        </Page>
    );
}
