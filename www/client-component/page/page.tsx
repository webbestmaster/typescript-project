import {type ReactNode, useContext, useEffect} from "react";
import {useParams, useLocation, type Location} from "react-router-dom";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {useGoogleAnalytics} from "../google-analytics/google-analytics";
import {googleAnalyticsId} from "../../const";
import type {ExtractPathKeysType} from "../../util/url";
import {appRoute} from "../../component/app/app-route";
import {rootArticleSlug} from "../../../server/article/article-const";
import {noop} from "../../util/function";
import type {ArticleContextType} from "../article/article-context/article-context-type";
import {articleContext} from "../article/article-context/article-context";
import {getArticleLinkToViewClient} from "../article/article-helper";
import {ReactScrollRestoration} from "../scroll-restoration/react-scroll-restoration";
import type {ThemeContextType} from "../../provider/theme/theme-context-type";
import {ThemeContext} from "../../provider/theme/theme-context";

import pageStyle from "./page.scss";

interface PagePropsType {
    readonly children: ReactNode;
}

export function Page(props: PagePropsType): JSX.Element {
    const {children} = props;
    const location: Location<unknown> = useLocation();
    const {pathname} = location;
    const {slug = ""} = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();
    const {setSlug = noop} = useContext<ArticleContextType>(articleContext);
    const {mdFontSize} = useContext<ThemeContextType>(ThemeContext);

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

    useGoogleAnalytics({
        googleAnalyticsId,
        pathname,
    });

    return (
        <div className={pageStyle.page} style={{fontSize: `${mdFontSize}px`}}>
            <Header />

            <div className={pageStyle.page_children}>{children}</div>

            <Footer />
            <ReactScrollRestoration />
        </div>
    );
}
