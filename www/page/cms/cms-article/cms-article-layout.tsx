import {Select, Typography} from 'antd';

import {Box} from '../../../layout/box/box';
import {ArticleType} from '../../../../server/article/article-type';

import {ArticleForValidationType} from './cms-article-type';
import {getArticleLinkToEdit} from './cms-article-helper';

const {Option} = Select;
const {Link, Text} = Typography;

export function renderUploadedFileListItem(
    originNode: JSX.Element
    // file: UploadFile<unknown>,
    // uploadedFileList: Array<UploadFile<unknown>>,
    // actions: { download: () => void; preview: () => void; remove: () => void }
): JSX.Element {
    return (
        <Box backgroundColor="#c00" height="auto">
            <div>{originNode}</div>
            <button type="button">markdown</button>
        </Box>
    );
}

export function makeSubDocumentOption(articleForValidation: ArticleForValidationType): JSX.Element {
    const {title, id} = articleForValidation;

    return (
        <Option key={id} title={title} value={id}>
            {title}
        </Option>
    );
}

export function renderParentList(
    article: ArticleType,
    savedArticleList: Array<ArticleForValidationType>
): Array<JSX.Element> {
    const {id: articleId} = article;

    const parentList: Array<JSX.Element> = savedArticleList
        .filter((savedArticle: ArticleForValidationType): boolean => savedArticle.subDocumentIdList.includes(articleId))
        .map((savedArticle: ArticleForValidationType, index: number): JSX.Element => {
            const {id, title, slug} = savedArticle;

            return (
                <Text key={id}>
                    {index > 0 ? ', ' : null}
                    <Link href={getArticleLinkToEdit(id)} target="_blank">
                        {title}/{slug}
                    </Link>
                </Text>
            );
        });

    if (parentList.length > 0) {
        return parentList;
    }

    return [<Text key="no-parents">no parents</Text>];
}
