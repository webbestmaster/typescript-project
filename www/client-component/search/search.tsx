/* global HTMLInputElement, document, MouseEvent, HTMLDivElement */

import {SyntheticEvent, useCallback, useEffect, useRef, useState} from 'react';

import {ArticleType} from '../../../server/article/article-type';
import {PaginationQueryType, PaginationResultType} from '../../../server/data-base/data-base-type';
import {useMakeExecutableState} from '../../util/function';
import {getArticleClientListPaginationPick} from '../../service/article/article-api';
import {useLocale} from '../../provider/locale/locale-context';

import {articlePreviewKeyList} from './search-const';
import {KeyForArticleSearchType, SearchArticleType} from './search-type';
import searchStyle from './search.scss';

export function Search(): JSX.Element {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {getLocalizedString} = useLocale();
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const minLetters = 2;

    const handleOnFocus = useCallback(() => {
        setHasFocus(true);
    }, []);

    useEffect(() => {
        function handleBodyOnClick(evt: MouseEvent) {
            const hasWrapperInPath = Boolean(wrapperRef.current && evt.composedPath().includes(wrapperRef.current));

            if (hasWrapperInPath) {
                return;
            }

            setHasFocus(false);
        }

        document.body.addEventListener('click', handleBodyOnClick, false);

        return () => {
            document.body.removeEventListener('click', handleBodyOnClick, false);
        };
    }, []);

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
        if (searchString.length >= minLetters) {
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
        <div className={searchStyle.search_wrapper} ref={wrapperRef}>
            <input
                onFocus={handleOnFocus}
                onInput={handleInput}
                placeholder={getLocalizedString('UI__SEARCH_PLACEHOLDER')}
                type="text"
            />

            <hr />

            <div>
                {isInProgressArticleList ? 'loading' : 'loaded'}
                <br />
                {hasFocus ? 'hasFocus' : 'hasNoFocus'}
            </div>

            <div>
                {searchString.length >= minLetters ? JSON.stringify(resultArticleList, null, 4) : <h1>[empty]</h1>}
            </div>
        </div>
    );
}
