/* global HTMLInputElement, setTimeout */
import {type SyntheticEvent, useEffect, useRef} from "react";
import {Input, type InputRef} from "antd";
import type {ColumnType, FilterDropdownProps} from "antd/es/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

import {getArticleLinkToEdit} from "../cms-article/cms-article-helper";
import {getTickCross} from "../../../util/string";
import {dateIsoToHumanView} from "../../../util/time";
import {getArticleLinkToViewClient} from "../../../client-component/article/article-helper";
import type {ArticleFileType} from "../../../../server/article/article-type";
import {getPathToImage} from "../../../util/path";

import {
    type ArticleForTableListKeysType,
    type ArticleForTableListType,
    type KeyForTableListListType,
    SortDirectionEnum,
} from "./cms-article-list-type";

interface GetArticleTableColumnListArgumentType {
    setSearchText: (searchText: string) => void;
    setSearchedColumn: (dataIndex: ArticleForTableListKeysType) => void;
}

export function getArticleTableColumnList(
    data: GetArticleTableColumnListArgumentType
): Array<ColumnType<ArticleForTableListType>> {
    const {setSearchedColumn, setSearchText} = data;

    const articleTableColumnList: Array<ColumnType<ArticleForTableListType>> = [
        {
            dataIndex: "title",
            defaultSortOrder: SortDirectionEnum.ascend,
            // eslint-disable-next-line react/no-multi-comp
            filterDropdown: (filterProps: FilterDropdownProps): JSX.Element => {
                const {visible} = filterProps;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const inputRef = useRef<InputRef>(null);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    if (visible) {
                        // Wait until the input appears
                        setTimeout(() => {
                            inputRef.current?.focus({cursor: "start"});
                        }, 100);
                    }
                }, [visible]);

                return (
                    <Input
                        key="title"
                        onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                            setSearchedColumn("title");
                            setSearchText(evt.currentTarget.value.trim());
                        }}
                        placeholder="Search..."
                        ref={inputRef}
                    />
                );
            },
            filterIcon: <SearchOutlined />,
            key: "title",
            render(title: string, article: ArticleForTableListType): JSX.Element {
                return (
                    <Link key={article.id} to={getArticleLinkToViewClient(article.slug)}>
                        {title}
                    </Link>
                );
            },
            sorter: (): number => {
                return 0;
            },
            title: "Title",
        },
        {
            dataIndex: "slug",
            defaultSortOrder: null,
            // eslint-disable-next-line react/no-multi-comp
            filterDropdown: (filterProps: FilterDropdownProps): JSX.Element => {
                const {visible} = filterProps;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const inputRef = useRef<InputRef>(null);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    if (visible) {
                        // Wait until the input appears
                        setTimeout(() => {
                            inputRef.current?.focus({cursor: "start"});
                        }, 100);
                    }
                }, [visible]);

                return (
                    <Input
                        key="slug"
                        onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                            setSearchedColumn("slug");
                            setSearchText(evt.currentTarget.value);
                        }}
                        placeholder="Search..."
                        ref={inputRef}
                    />
                );
            },
            filterIcon: <SearchOutlined />,
            key: "slug",
            render(slug: string, article: ArticleForTableListType): JSX.Element {
                return (
                    <Link key={article.id} to={getArticleLinkToEdit(article.id)}>
                        {slug}
                    </Link>
                );
            },
            sorter: (): number => {
                return 0;
            },
            title: "Slug/edit",
        },
        {
            dataIndex: "articleType",
            defaultSortOrder: null,
            key: "articleType",
            sorter: (): number => {
                return 0;
            },
            title: "Type",
        },
        {
            align: "center",
            dataIndex: "isActive",
            defaultSortOrder: null,
            key: "isActive",
            render(
                isActive: boolean
                // ignored article: ArticleForTableListType
            ): string {
                return getTickCross(isActive);
            },
            sorter: (): number => {
                return 0;
            },
            title: "Is active",
        },
        {
            align: "center",
            dataIndex: "titleImage",
            defaultSortOrder: null,
            key: "titleImage",
            render(imageFile: ArticleFileType): JSX.Element {
                return (
                    <img
                        alt={imageFile.title}
                        height="64px"
                        src={getPathToImage(imageFile.name, {
                            height: 64,
                            width: 64,
                        })}
                        style={{objectFit: "contain"}}
                        width="64px"
                    />
                );
            },
            sorter: (): number => {
                return 0;
            },
            title: "Image",
        },
        {
            align: "right",
            dataIndex: "createdDate",
            defaultSortOrder: null,
            key: "createdDate",
            render: dateIsoToHumanView,
            sorter: (): number => {
                return 0;
            },
            title: "Created UTC-0",
            width: 120,
        },
        {
            align: "right",
            dataIndex: "updatedDate",
            defaultSortOrder: null,
            key: "updatedDate",
            render: dateIsoToHumanView,
            sorter: (): number => {
                return 0;
            },
            title: "Updated UTC-0",
            width: 120,
        },
        {
            align: "right",
            dataIndex: "publishDate",
            defaultSortOrder: null,
            key: "publishDate",
            render: dateIsoToHumanView,
            sorter: (): number => {
                return 0;
            },
            title: "Publish UTC-0",
            width: 120,
        },
    ];

    return articleTableColumnList;
}

export const keyForTableListList: KeyForTableListListType = [
    "articleType",
    "createdDate",
    "id",
    "isActive",
    "publishDate",
    "slug",
    "title",
    "titleImage",
    "updatedDate",
];
