// ignored import {useSystem} from 'react-system-hook';
import {useContext, useEffect} from "react";

import type {ArticleContextType} from "../../../client-component/article/article-context/article-context-type";
import {articleContext} from "../../../client-component/article/article-context/article-context";
import {Page} from "../../../client-component/page/page";
import {ArticlePreviewList} from "../../../client-component/article-preview-list/article-preview-list";
import {Markdown} from "../../../layout/markdown/markdown";
import {PageHeader} from "../../../client-component/page-header/page-header";
import {copyrightName} from "../../../const";
import {SubDocumentListViewTypeEnum} from "../../../../server/article/article-type";
import {FetchMethodEnum, fetchX} from "../../../util/fetch";
import type {UnknownObjectType} from "../../../util/type";
import {apiUrl} from "../../../../server/const";

// eslint-disable-next-line max-statements
export function ClientHome(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    useEffect(() => {
        (async (): Promise<void> => {
            const resultQueries: Record<string, string> = {
                pagination: JSON.stringify({
                    pageIndex: 0,
                    pageSize: 100,
                    sort: {title: 1},
                }),
                query: JSON.stringify({
                    title: /article \d of 2/giu.toString(),
                }),
                source: `{
  articlePagination {
    list {
      articleType
      title
      id
      slug
      fileList {
        name
        size
        duration
      }
    }
    sort {
      title
    }
    pageIndex,
    pageSize,
    totalItemCount,
    totalPageCount,
  }
}`,
            };

            const queriesAsString: string = new URLSearchParams(resultQueries).toString();

            const data = await fetchX<UnknownObjectType>(
                `${apiUrl.adminArticlePaginationGraphQLGet}?${queriesAsString}`,
                {
                    required: [],
                    type: "object",
                },
                {
                    credentials: "include",
                    method: FetchMethodEnum.get,
                }
            );
            console.log(data);
        })();
    }, []);

    return (
        <Page>
            <PageHeader>{copyrightName}</PageHeader>
            <ArticlePreviewList childList={childList} previewStyle={SubDocumentListViewTypeEnum.headerImage} />
            <Markdown articleTitle={title} mdInput={content} />
        </Page>
    );
}
