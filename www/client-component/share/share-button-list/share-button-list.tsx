import {useContext} from 'react';

import {ArticleContextType} from '../../article/article-context/article-context-type';
import {articleContext} from '../../article/article-context/article-context';
import {getClientArticleLinkWithDomain} from '../../../page/cms/cms-article/cms-article-helper';

import {defaultListHeader} from './share-button-list-const';
import {ShareButtonListContent} from './share-button-list-content/share-button-list-content';

export function ShareButtonList(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);

    return (
        <ShareButtonListContent
            listHeader={defaultListHeader}
            title={article.title}
            url={getClientArticleLinkWithDomain(article.slug)}
        />
    );
}
