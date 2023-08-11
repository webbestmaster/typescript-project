import {ReactNode, useContext, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';

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
import {getArticleLinkToViewClient} from '../article/article-helper';
import {ReactScrollRestoration} from '../scroll-restoration/react-scroll-restoration';

import pageStyle from './page.scss';

type PagePropsType = {
    readonly children: ReactNode;
};

export function Page(props: PagePropsType): JSX.Element {
    const {children} = props;
    const location = useLocation();
    const {pathname} = location;
    const {slug = ''} = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();
    const {setSlug = noop} = useContext<ArticleContextType>(articleContext);

    useEffect(() => {
        const trimmedSlug = slug.trim();

        // Check for /article/<slug>
        if (trimmedSlug && pathname === getArticleLinkToViewClient(trimmedSlug)) {
            setSlug(trimmedSlug);
            return;
        }

        if (pathname === appRoute.root.path) {
            setSlug(rootArticleSlug);
        }
    }, [slug, setSlug, pathname]);

    useGoogleAnalytics({googleAnalyticsId, pathname});

    return (
        <div className={pageStyle.page}>
            <Header />

            <div className={pageStyle.page_children}>{children}</div>

            <Footer />
            <ReactScrollRestoration />
        </div>
    );
}
