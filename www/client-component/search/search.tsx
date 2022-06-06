/* global HTMLInputElement */

import {SyntheticEvent, useCallback, useEffect, useState} from 'react';

import {ArticleType} from '../../../server/article/article-type';
import {PaginationQueryType, PaginationResultType} from '../../../server/data-base/data-base-type';
import {useMakeExecutableState} from '../../util/function';
import {getArticleClientListPaginationPick} from '../../service/article/article-api';

import {articlePreviewKeyList} from './search-const';
import {KeyForArticleSearchType, SearchArticleType} from './search-type';

export function Search(): JSX.Element {
    // article for table
    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        [PaginationQueryType<ArticleType>, KeyForArticleSearchType],
        PaginationResultType<SearchArticleType>
    >(getArticleClientListPaginationPick);

    const [searchString, setSearchString] = useState<string>('');

    const handleInput = useCallback((evt: SyntheticEvent<HTMLInputElement>) => {
        setSearchString(evt.currentTarget.value.trim());
    }, []);

    useEffect(() => {
        if (searchString.length >= 2) {
            executeArticleList(
                {
                    pageIndex: 0,
                    pageSize: 0,
                    query: {
                        title: {
                            $regex: searchString,
                            $regexFlag: 'gi',
                        },
                    },
                    sort: {title: 1},
                },
                articlePreviewKeyList
            );
        }
    }, [searchString, executeArticleList]);

    return (
        <div>
            <input onInput={handleInput} placeholder="Search..." type="text" />

            <hr />

            <pre>
                {isInProgressArticleList ? 'loading' : 'loaded'}
                <hr />
                {JSON.stringify(resultArticleList, null, 4)}
            </pre>
        </div>
    );
}
