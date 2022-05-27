import {useContext, useCallback, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';
import {ArticlePreviewType} from '../../../server/article/article-type';
import {getClientArticleLink} from '../../page/cms/cms-article/cms-article-helper';

export function Breadcrumbs(): JSX.Element {
    const {breadcrumbs, article} = useContext<ArticleContextType>(articleContext);

    const renderLink = useCallback((articlePreview: ArticlePreviewType, index: number): JSX.Element => {
        const {slug, title} = articlePreview;

        const href = index === 0 ? '/' : getClientArticleLink(slug);

        return (
            <Fragment key={`${slug}-${String(index)}`}>
                <Link to={href}>{title}</Link>
                <span>&nbsp;/&nbsp;</span>
            </Fragment>
        );
    }, []);

    const linkList = breadcrumbs.map<JSX.Element>(renderLink);

    return (
        <div>
            {linkList}
            {article.title}
        </div>
    );
}
