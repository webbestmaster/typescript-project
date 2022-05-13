import {Typography} from 'antd';
import {ColumnType} from 'antd/lib/table/interface';

import {getArticleLinkToEdit} from '../cms-article/cms-article-helper';
import {getPathToImage} from '../../../service/file/file';

import {ArticleForTableListType, KeyForTableListListType, SortDirectionEnum} from './cms-article-list-type';
import {renderDate} from './cms-article-list-helper';

const {Link} = Typography;

export const articleTableColumnList: Array<ColumnType<ArticleForTableListType>> = [
    /*
    {
        dataIndex: 'id',
        defaultSortOrder: null,
        key: 'id',
        sorter: () => 0,
        title: 'Id',
    },
*/
    {
        dataIndex: 'title',
        defaultSortOrder: SortDirectionEnum.ascend,
        key: 'title',
        sorter: () => 0,
        title: 'Title',
    },
    {
        dataIndex: 'slug',
        defaultSortOrder: null,
        key: 'slug',
        render(slug: string, article: ArticleForTableListType) {
            return (
                <Link href={getArticleLinkToEdit(article.id)} key={article.id}>
                    {slug}
                </Link>
            );
        },
        sorter: () => 0,
        title: 'Slug/edit',
    },
    {
        dataIndex: 'articleType',
        defaultSortOrder: null,
        key: 'articleType',
        sorter: () => 0,
        title: 'Type',
    },
    {
        align: 'center',
        dataIndex: 'isActive',
        defaultSortOrder: null,
        key: 'isActive',
        render(
            isActive: boolean
            // article: ArticleForTableListType
        ) {
            return isActive ? '✔' : '❌';
        },
        sorter: () => 0,
        title: 'Is active',
    },
    {
        align: 'center',
        dataIndex: 'titleImage',
        defaultSortOrder: null,
        key: 'titleImage',
        render(
            imageName: string
            // article: ArticleForTableListType
        ) {
            return (
                <img
                    alt={imageName}
                    height="64px"
                    src={getPathToImage(imageName)}
                    style={{objectFit: 'contain'}}
                    width="64px"
                />
            );
        },
        sorter: () => 0,
        title: 'Image',
    },
    {
        align: 'right',
        dataIndex: 'createdDate',
        defaultSortOrder: null,
        key: 'createdDate',
        render: renderDate,
        sorter: () => 0,
        title: 'Created UTC',
        width: 120,
    },
    {
        align: 'right',
        dataIndex: 'updatedDate',
        defaultSortOrder: null,
        key: 'updatedDate',
        render: renderDate,
        sorter: () => 0,
        title: 'Updated UTC',
        width: 120,
    },
    {
        align: 'right',
        dataIndex: 'publishDate',
        defaultSortOrder: null,
        key: 'publishDate',
        render: renderDate,
        sorter: () => 0,
        title: 'Publish UTC',
        width: 120,
    },
];

export const keyForTableListList: KeyForTableListListType = [
    'id',
    'slug',
    'title',
    'titleImage',
    'articleType',
    'isActive',
    'createdDate',
    'updatedDate',
    'publishDate',
];
