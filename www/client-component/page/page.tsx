import {ReactNode, useContext, useEffect} from 'react';
import {useLocation} from 'react-router';
import {useParams} from 'react-router-dom';

import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {useGoogleAnalytics} from '../google-analytics/google-analytics';
import {googleAnalyticsId} from '../../const';
import {ExtractPathKeysType} from '../../util/url';
import {appRoute} from '../../component/app/app-route';
import {rootArticleSlug} from '../../../server/article/article-const';
import {noop} from '../../util/function';
import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';

import pageStyle from './page.scss';

type PagePropsType = {
    children: ReactNode;
};

export function Page(props: PagePropsType): JSX.Element {
    const {children} = props;
    const location = useLocation();
    const {slug = rootArticleSlug} = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();
    const {setSlug = noop} = useContext<ArticleContextType>(articleContext);

    useEffect(() => {
        setSlug(slug);
    }, [slug, setSlug]);

    useGoogleAnalytics({googleAnalyticsId, pathname: location.pathname});

    return (
        <div className={pageStyle.page}>
            <Header />

            <div className={pageStyle.page_children}>{children}</div>

            <Footer />
        </div>
    );
}
