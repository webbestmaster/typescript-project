import {useLocation} from 'react-router';

import {Navigation} from '../../../client-component/navigation/navigation';
import {Article} from '../../../client-component/article/article';
import {Breadcrumbs} from '../../../client-component/breadcrumbs/breadcrumbs';
import {Siblings} from '../../../client-component/siblings/siblings';
import {ShareButtonList} from '../../../client-component/share/share-button-list/share-button-list';
import {useGoogleAnalytics} from '../../../client-component/google-analytics/google-analytics';
import {googleAnalyticsId} from '../../../const';
import {TopAdsWrapper} from '../../../client-component/ads/top-ads-wrapper/top-ads-wrapper';
import {BottomAdsWrapper} from '../../../client-component/ads/bottom-ads-wrapper/bottom-ads-wrapper';

export function ClientArticle(): JSX.Element {
    const location = useLocation();

    useGoogleAnalytics({googleAnalyticsId, pathname: location.pathname});

    return (
        <div>
            <Navigation />
            <TopAdsWrapper />
            <Breadcrumbs />
            <Article />
            <Siblings />
            <BottomAdsWrapper />
            <ShareButtonList />
        </div>
    );
}
