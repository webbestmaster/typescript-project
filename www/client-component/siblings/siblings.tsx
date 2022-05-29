import {useContext, useCallback, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {ArticleContextType} from '../article/article-context/article-context-type';
import {articleContext} from '../article/article-context/article-context';
import {ArticlePreviewType} from '../../../server/article/article-type';
import {getArticleLinkToViewClient} from '../article/article-helper';

export function Siblings(): JSX.Element {
    const {siblingList} = useContext<ArticleContextType>(articleContext);

    const renderLink = useCallback((articlePreview: ArticlePreviewType, index: number): JSX.Element => {
        const {slug, title} = articlePreview;

        return (
            <Fragment key={`${slug}-${String(index)}`}>
                <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                <br />
            </Fragment>
        );
    }, []);

    const linkList = siblingList.map<JSX.Element>(renderLink);

    return <div>{linkList}</div>;
}
