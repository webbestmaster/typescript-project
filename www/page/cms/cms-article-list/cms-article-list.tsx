// eslint-disable-next-line import/no-default-export
import {useEffect} from 'react';

import {useMakeExecutableState} from '../../../util/function';
import {PaginationResultType} from '../../../../server/data-base/data-base-type';
import {ArticleType} from '../../../../server/article/article-type';
import {getArticleListPagination, getArticleListPaginationPartial} from '../../../service/article/article-api';

// eslint-disable-next-line import/no-default-export
export default function CmsArticleList(): JSX.Element {
    /*
    const {execute, result} = useMakeExecutableState<[], PaginationResultType<ArticleType>>(getArticleListPagination);

    useEffect(() => {
        execute();
    }, [execute]);
*/

    const {execute, result} = useMakeExecutableState<
        [Array<'articleType' | 'slug'>],
        PaginationResultType<Pick<ArticleType, 'articleType' | 'slug'>>
    >(getArticleListPaginationPartial);

    useEffect(() => {
        execute(['articleType', 'slug']);
    }, [execute]);

    return (
        <div>
            <h1>Article list</h1>
            <pre>{JSON.stringify(result, null, 4)}</pre>
        </div>
    );
}
