/* global HTMLInputElement */
import 'antd/dist/antd.css';

import {SyntheticEvent, useEffect, useState} from 'react';
import {Table, Typography, message, Input} from 'antd';
import {
    ColumnType,
    TablePaginationConfig,
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
    FilterDropdownProps,
} from 'antd/lib/table/interface';
import {SearchOutlined} from '@ant-design/icons';

import {useMakeExecutableState} from '../../../util/function';
import {PaginationQueryType, PaginationResultType} from '../../../../server/data-base/data-base-type';
import {ArticleType} from '../../../../server/article/article-type';
import {getArticleListPaginationPick} from '../../../service/article/article-api';
import {CmsPage} from '../layout/cms-page/cms-page';
import {ArticleForValidationType, KeyForValidationListType} from '../cms-article/cms-article-type';
import {keyForValidationList} from '../cms-article/cms-article-const';

import {articleTableColumnList, keyForTableListList} from './cms-article-list-const';
import {
    ArticleForTableListKeysType,
    ArticleForTableListType,
    KeyForTableListListType,
    SortDirectionEnum,
} from './cms-article-list-type';

const {Title} = Typography;

// eslint-disable-next-line import/no-default-export
export default function CmsArticleList(): JSX.Element {
    const defaultPageSize = 10;
    const [searchedColumn, setSearchedColumn] = useState<ArticleForTableListKeysType>('title');
    const [searchText, setSearchText] = useState<string>('');

    // article for table
    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        [PaginationQueryType<ArticleType>, KeyForTableListListType],
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

    // article for pagination
    const {execute: executeArticleListPaginationPick} = useMakeExecutableState<
        [PaginationQueryType<ArticleType>, KeyForValidationListType],
        PaginationResultType<ArticleForValidationType>
    >(getArticleListPaginationPick);

    const [savedArticleList, setSavedArticleList] = useState<Array<ArticleForValidationType>>([]);

    useEffect(() => {
        executeArticleListPaginationPick({pageIndex: 0, pageSize: 0, query: {}, sort: {title: 1}}, keyForValidationList)
            .then((data: PaginationResultType<ArticleForValidationType>) => setSavedArticleList(data.result))
            .catch((error: Error) => {
                console.log(error);
                message.error('Can not fetch article list.');
            });
    }, [executeArticleListPaginationPick]);

    function handleTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: Array<SorterResult<ArticleForTableListType>> | SorterResult<ArticleForTableListType>,
        extra: TableCurrentDataSource<ArticleForTableListType>
    ) {
        if (!Array.isArray(sorter)) {
            const {field, order} = sorter;
            const sortDirection = order === SortDirectionEnum.descend ? -1 : 1;

            const pageIndex = (pagination.current || 1) - 1;
            const pageSize = pagination.pageSize || defaultPageSize;

            setPaginationArticleList({
                ...paginationArticleList,
                pageIndex,
                pageSize,
                sort: {[String(field)]: sortDirection},
            });
        }

        console.log('handleTableChange');
        console.log('pagination:', pagination);
        console.log('filters:', filters);
        console.log('sorter:', sorter);
        console.log('extra:', extra);
        console.log('///');
        console.log(searchedColumn);
        console.log(searchText);
        console.log('///');
    }

    function getColumnSearchProps(dataIndex: ArticleForTableListKeysType): ColumnType<ArticleForTableListType> {
        return {
            // @ts-ignore
            /*
            onFilter: (value, record) =>
                record[dataIndex]
                    // @ts-ignore
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
*/
            // eslint-disable-next-line react/no-unstable-nested-components
            filterDropdown: (filterDropdownData: FilterDropdownProps) => {
                const {clearFilters, selectedKeys} = filterDropdownData;

                return (
                    <Input
                        key={dataIndex}
                        onPressEnter={(evt: SyntheticEvent<HTMLInputElement>) => {
                            // if (clearFilters) {
                            // clearFilters();
                            // }

                            console.log('//' + evt.currentTarget.value);
                            setSearchedColumn(dataIndex);
                            setSearchText(String(evt.currentTarget.value || 'no-text').trim());
                        }}
                        placeholder="Search..."
                    />
                );
            },
            filterIcon: <SearchOutlined />,
        };
    }

    const articleTableColumnListExtended: Array<ColumnType<ArticleForTableListType>> = articleTableColumnList.map<
        ColumnType<ArticleForTableListType>
    >((articleTableColumn: ColumnType<ArticleForTableListType>): ColumnType<ArticleForTableListType> => {
        const {dataIndex} = articleTableColumn;

        if (dataIndex === 'title' || dataIndex === 'slug') {
            return {
                ...articleTableColumn,
                ...getColumnSearchProps(dataIndex),
            };
        }

        return {...articleTableColumn};
    });

    return (
        <CmsPage>
            <Title level={2}>Article list</Title>

            <Table<ArticleForTableListType>
                columns={articleTableColumnListExtended}
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
                    total: savedArticleList.length,
                }}
                rowKey="id"
            />
        </CmsPage>
    );
}
