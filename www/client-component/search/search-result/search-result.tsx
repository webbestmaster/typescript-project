import {Link} from 'react-router-dom';

import {SearchArticleType} from '../search-type';
import {getArticleLinkToViewClient} from '../../article/article-helper';

import searchResultStyle from './search-result.scss';

type SearchResultPropsType = {
    isLoading: boolean;
    list: Array<SearchArticleType>;
    minLetters: number;
    searchString: string;
};

export function SearchResult(props: SearchResultPropsType): JSX.Element {
    const {isLoading, list, searchString, minLetters} = props;

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (searchString.length < minLetters) {
        return <h1>[ Empty ]</h1>;
    }

    if (list.length === 0) {
        return <h1>no result for {searchString}</h1>;
    }

    return (
        <div>
            {list.map<JSX.Element>((searchArticle: SearchArticleType): JSX.Element => {
                const {title, slug} = searchArticle;

                return (
                    <Link
                        className={searchResultStyle.search_result_link}
                        key={slug}
                        to={getArticleLinkToViewClient(slug)}
                    >
                        {title}
                    </Link>
                );
            })}
        </div>
    );
}
