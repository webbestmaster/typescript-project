import 'antd/dist/reset.css';

import {useEffect, useState} from 'react';
import {Table, Typography} from 'antd';
import {TablePaginationConfig, FilterValue, SorterResult, TableCurrentDataSource} from 'antd/es/table/interface';

import {useMakeExecutableState} from '../../../util/function';
import {PaginationQueryType, PaginationResultType} from '../../../../server/data-base/data-base-type';
import {getArticleListPaginationPick} from '../../../service/article/article-api';
import {CmsPage} from '../layout/cms-page/cms-page';

import {getArticleTableColumnList, keyForTableListList} from './cms-article-list-const';
import {ArticleForTableListKeysType, ArticleForTableListType, SortDirectionEnum} from './cms-article-list-type';

const {Title} = Typography;

export function CmsArticleList(): JSX.Element {
    const defaultPageSize = 10;
    const [searchedColumn, setSearchedColumn] = useState<ArticleForTableListKeysType>('title');
    const [searchText, setSearchText] = useState<string>('');

    // article for table
    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        Parameters<typeof getArticleListPaginationPick<keyof ArticleForTableListType>>,
        PaginationResultType<ArticleForTableListType>
    >(getArticleListPaginationPick);

    const [paginationArticleList, setPaginationArticleList] = useState<PaginationQueryType<ArticleForTableListType>>({
        pageIndex: 0,
        pageSize: defaultPageSize,
        query: {},
        sort: {title: 1},
    });

    useEffect(() => {
        executeArticleList(paginationArticleList, keyForTableListList);
    }, [executeArticleList, paginationArticleList]);

    // eslint-disable-next-line complexity, max-statements
    function handleTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: Array<SorterResult<ArticleForTableListType>> | SorterResult<ArticleForTableListType>,
        extra: TableCurrentDataSource<ArticleForTableListType>
    ) {
        const firstSorter: SorterResult<ArticleForTableListType> | void = Array.isArray(sorter) ? sorter[0] : sorter;

        if (!firstSorter) {
            console.warn('handleTableChange - NO firstSorter');
            return;
        }

        const {column, order, field, columnKey} = firstSorter;
        const sortDirection = order === SortDirectionEnum.descend ? -1 : 1;

        const pageIndex = (pagination.current || 1) - 1;
        const pageSize = pagination.pageSize || defaultPageSize;

        setPaginationArticleList((): PaginationQueryType<ArticleForTableListType> => {
            return {
                pageIndex,
                pageSize,
                query: {[searchedColumn]: {$regex: searchText, $regexFlag: 'i'}},
                sort: {[String(field)]: sortDirection},
            };
        });

        console.log('handleTableChange');
        console.log('pagination:', pagination);
        console.log('filters:', filters);
        console.log('column:', column);
        console.log('sorter:', sorter);
        console.log('order:', order);
        console.log('columnKey:', columnKey);
        console.log('extra:', extra);
        console.log('///');
        console.log(searchedColumn);
        console.log(searchText);
        console.log('///');
    }

    return (
        <CmsPage>
            <Title level={2}>Article list</Title>

            <Table<ArticleForTableListType>
                columns={getArticleTableColumnList({setSearchText, setSearchedColumn})}
                dataSource={resultArticleList?.result || []}
                loading={isInProgressArticleList}
                onChange={handleTableChange}
                pagination={{
                    current: paginationArticleList.pageIndex + 1,
                    defaultPageSize,
                    hideOnSinglePage: false,
                    pageSize: paginationArticleList.pageSize,
                    pageSizeOptions: [defaultPageSize, 50, 100, 500, 1000, 2000, 5000],
                    showSizeChanger: true,
                    total: resultArticleList?.count || 0,
                }}
                rowKey="id"
            />
        </CmsPage>
    );
}
