import {useEffect, useState} from 'react';
import {Typography, Select, Input, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {UploadFile} from 'antd/lib/upload/interface';
import {Link} from 'react-router-dom';

import {Box} from '../../../layout/box/box';
import {ArticleType} from '../../../../server/article/article-type';

import {ArticleForValidationType} from './cms-article-type';
import {getArticleLinkToEdit, getFileMarkdown} from './cms-article-helper';

const {Option} = Select;
const {Text} = Typography;

export function renderUploadedFileListItem(
    originNode: JSX.Element,
    file: UploadFile<unknown>
    // uploadedFileList: Array<UploadFile<unknown>>,
    // actions: { download: () => void; preview: () => void; remove: () => void }
): JSX.Element {
    const {name} = file;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [markdown, setMarkdown] = useState<string>('');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getFileMarkdown(name).then(setMarkdown).catch(console.error);
    }, [name]);

    return (
        <Box height={112}>
            {originNode}
            <Input value={markdown} />
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

export function getParentLit(
    article: ArticleType,
    savedArticleList: Array<ArticleForValidationType>
): Array<ArticleForValidationType> {
    const {id: articleId} = article;

    return savedArticleList.filter((savedArticle: ArticleForValidationType): boolean =>
        savedArticle.subDocumentIdList.includes(articleId)
    );
}

export function renderParentList(
    article: ArticleType,
    savedArticleList: Array<ArticleForValidationType>
): Array<JSX.Element> {
    const parentList: Array<JSX.Element> = getParentLit(article, savedArticleList).map(
        (savedArticle: ArticleForValidationType, index: number): JSX.Element => {
            const {id, title, slug} = savedArticle;

            return (
                <Text key={id}>
                    {index > 0 ? ', ' : null}
                    <Link to={getArticleLinkToEdit(id)}>
                        {title}/{slug}
                    </Link>
                </Text>
            );
        }
    );

    if (parentList.length > 0) {
        return parentList;
    }

    return [<Text key="no-parents">no parents</Text>];
}

export function UploadButton(): JSX.Element {
    return <Button icon={<PlusOutlined />}>Upload</Button>;
}
