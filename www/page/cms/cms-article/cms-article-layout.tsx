import {Typography, Select, Input, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {UploadFile} from 'antd/lib/upload/interface';
import {Link} from 'react-router-dom';

import {Box} from '../../../layout/box/box';
import {ArticleFileType, ArticleType} from '../../../../server/article/article-type';
import {getArticleLinkToViewClient} from '../../../client-component/article/article-helper';

import {ArticleForValidationType} from './cms-article-type';
import {
    getArticleLinkToEdit,
    getFileMarkdownByFullInfo,
    getIsImage,
    getPathToFile,
    getPathToImage,
} from './cms-article-helper';

const {Option} = Select;
const {Text} = Typography;

export function makeFileListItem(fileInfo: ArticleFileType): UploadFile<unknown> {
    const {name: fileInfoName} = fileInfo;

    const url = getIsImage(fileInfoName)
        ? getPathToImage(fileInfoName, {height: 96, width: 96})
        : getPathToFile(fileInfoName);

    return {
        name: fileInfoName,
        status: 'done',
        uid: fileInfoName,
        url,
    };
}

export function renderUploadedFileListItem(
    originNode: JSX.Element,
    file: UploadFile<unknown>,
    fileList: Array<ArticleFileType>
    // uploadedFileList: Array<UploadFile<unknown>>,
    // actions: { download: () => void; preview: () => void; remove: () => void }
): JSX.Element {
    const {name} = file;
    const fileInfo: ArticleFileType | void = fileList.find(
        (fileInfoInFileList: ArticleFileType): boolean => fileInfoInFileList.name === name
    );

    return (
        <Box height={112}>
            {originNode}
            {fileInfo ? (
                <Input value={getFileMarkdownByFullInfo(fileInfo, {alt: '', title: ''})} />
            ) : (
                <Input status="error" value={`[ERROR]: can not find file by name: ${name}`} />
            )}
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
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    &nbsp;|&nbsp;
                    <Link to={getArticleLinkToEdit(id)}>{slug}</Link>
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
