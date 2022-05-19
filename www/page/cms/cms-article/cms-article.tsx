/* global File */
import {useState, useEffect} from 'react';
// node_modules/antd/lib/upload/index.d.ts
// TODO: set declare const Upload: UploadInterface<any>; TO declare const Upload: UploadInterface<unknown>;
// node_modules/antd/lib/upload/index.d.ts
// WARNING: set declare const Upload: UploadInterface<any>; TO declare const Upload: UploadInterface<unknown>;
import {Upload, Form, Input, Button, Typography, Select, Checkbox, DatePicker, message} from 'antd';
import moment, {Moment} from 'moment';
import {ValidateErrorEntity, FieldData} from 'rc-field-form/lib/interface';
import {UploadChangeParam, UploadFile} from 'antd/lib/upload/interface';
import 'antd/dist/antd.css';

import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from '../../../../server/article/article-type';
import {validateArticle} from '../../../../server/article/article-validation';
import {
    arrayToStringByComma,
    humanNormalizeString,
    makeTagsPreview,
    stringToArrayByComma,
    textToSlug,
} from '../../../util/human';
import {useMakeExecutableState} from '../../../util/function';
import {PaginationQueryType, PaginationResultType} from '../../../../server/data-base/data-base-type';
import {getArticleListPaginationPick} from '../../../service/article/article-api';
import {MarkdownInputWrapper} from '../../../layout/markdown-input-wrapper';
import {IsRender} from '../../../layout/is-render/is-render';

import {getPathToImage, uploadFile, makeHtmlValidator, makeSlugValidator, getAbsentIdList} from './cms-article-helper';
import {renderUploadedFileListItem, makeSubDocumentOption, renderParentList, UploadButton} from './cms-article-layout';
import {CmsArticleModeEnum, fileAccept, imageAccept, keyForValidationList, noDateUTC} from './cms-article-const';
import {ArticleForValidationType, KeyForValidationListType} from './cms-article-type';

const {Text, Title} = Typography;
const {Option} = Select;
const {TextArea} = Input;

type CmsArticlePropsType = {
    article: ArticleType;
    mode: CmsArticleModeEnum;
    onFinish: (article: ArticleType) => void;
};

// eslint-disable-next-line complexity
export function CmsArticle(props: CmsArticlePropsType): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const {article, onFinish, mode} = props;
    const {
        articleType,
        content,
        createdDate,
        description,
        descriptionShort,
        fileList: defaultFileList,
        hasMetaRobotsNoFollowSeo, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id,
        isActive, // actually temporary "removed"
        isInSiteMapXmlSeo, // has sitemap.xml link to article or not
        metaDescriptionSeo, // tag <meta type="description" content="....." />
        metaKeyWordsSeo, // tag <meta type="keywords" content="....." />
        metaSeo, // actually any html code
        publishDate: defaultPublishDate,
        slug,
        stuffArtistList,
        stuffAuthorList,
        stuffCompositorList,
        stuffDirectorList,
        stuffIllustratorList,
        stuffReaderList,
        subDocumentIdList,
        subDocumentListViewType,
        tagList,
        tagTitleSeo, // tag <title>....</title>
        title,
        titleImage: defaultTitleImage,
        updatedDate,
    } = article;

    const [form] = Form.useForm<ArticleType>();
    const [fileList, setFileList] = useState<Array<string>>([...defaultFileList]);
    const [titleImage, setTitleImage] = useState<string>(defaultTitleImage);
    const [publishDate, setPublishDate] = useState<string>(defaultPublishDate || new Date().toISOString());
    const [recommendedSlug, setRecommendedSlug] = useState<string>(textToSlug(title));
    const [currentArticleState, setCurrentArticleState] = useState<ArticleType>(article);

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

    function onFinishForm(rawValues: ArticleType) {
        const values: ArticleType = {
            ...rawValues,
            fileList,
            publishDate,
            stuffArtistList: stringToArrayByComma(rawValues.stuffArtistList),
            stuffAuthorList: stringToArrayByComma(rawValues.stuffAuthorList),
            stuffCompositorList: stringToArrayByComma(rawValues.stuffCompositorList),
            stuffDirectorList: stringToArrayByComma(rawValues.stuffDirectorList),
            stuffIllustratorList: stringToArrayByComma(rawValues.stuffIllustratorList),
            stuffReaderList: stringToArrayByComma(rawValues.stuffReaderList),
            tagList: stringToArrayByComma(rawValues.tagList),
            title: humanNormalizeString(rawValues.title),
            titleImage,
        };
        // validate form
        const [isValidArticle, validateFunction] = validateArticle(values);

        console.info('validateFunction.errors');
        console.info(validateFunction.errors);
        console.log('onFinishForm, is valid -', isValidArticle);
        console.log('---> onFinishForm, values -', values);
        console.log('---> onFinishForm, fileList -', fileList);

        if (isValidArticle) {
            onFinish(values);
            return;
        }

        message.error(JSON.stringify(validateFunction.errors));
    }

    function onFinishFailedForm(errorInfo: ValidateErrorEntity<ArticleType>) {
        message.error(JSON.stringify(errorInfo.errorFields));
        console.log('onFinishFailedForm:', errorInfo);
        console.log('onFinishFailedForm:', article);
    }

    function onValuesChangeForm(changedValues: unknown, values: ArticleType) {
        setRecommendedSlug(textToSlug(values.title));
        setCurrentArticleState(values);
        console.log('onValuesChangeForm:', changedValues, values);
        console.log('onValuesChangeForm:', article);
    }

    function onFieldsChangeForm(changedFields: Array<FieldData>, allFields: Array<FieldData>) {
        console.log('onFieldsChangeForm:', changedFields, allFields);
        console.log('onFieldsChangeForm:', article);
    }

    function handleChangeFileList(info: UploadChangeParam<UploadFile<unknown>>) {
        const {file} = info;

        if (file.status === 'removed') {
            setFileList((currentFileList: Array<string>): Array<string> => {
                return currentFileList.filter((fileName: string): boolean => fileName !== file.name);
            });
        }

        console.log('handleChangeFileList:', info);
        console.log('handleChangeFileList:', article);
    }

    function handleChangeTitleImage(info: UploadChangeParam<UploadFile<unknown>>) {
        const {file} = info;

        if (file.status === 'removed') {
            setTitleImage('');
        }

        console.log('handleChangeTitleImage:', info);
        console.log('handleChangeTitleImage:', article);
    }

    const absentIdList = getAbsentIdList(subDocumentIdList, savedArticleList);

    return (
        <Form<ArticleType>
            autoComplete="off"
            form={form}
            initialValues={{remember: true}}
            layout="vertical"
            name="article"
            onFieldsChange={onFieldsChangeForm}
            onFinish={onFinishForm}
            onFinishFailed={onFinishFailedForm}
            onValuesChange={onValuesChangeForm}
            scrollToFirstError
        >
            <IsRender isRender={absentIdList.length > 0}>
                <Title level={4} type="danger">
                    Document has missing children, children Id:&nbsp;{absentIdList.join(', ')}
                </Title>
            </IsRender>

            <Text>Parents:&nbsp;{renderParentList(article, savedArticleList)}</Text>
            <Form.Item hidden initialValue={id} label={`Article id: ${id}`} name="id">
                <Input disabled />
            </Form.Item>

            <Form.Item label={`Title image: ${titleImage}`}>
                <Upload<unknown>
                    accept={imageAccept}
                    action={async (file: File): Promise<string> => {
                        const {uniqueFileName} = await uploadFile(file);

                        setTitleImage(uniqueFileName);

                        // just prevent extra request to our server
                        return 'https://dev.null/dev/null';
                    }}
                    fileList={
                        titleImage
                            ? [
                                  {
                                      name: titleImage,
                                      status: 'done',
                                      uid: titleImage,
                                      url: getPathToImage(titleImage, {height: 96, width: 96}),
                                  },
                              ]
                            : []
                    }
                    itemRender={renderUploadedFileListItem}
                    listType="picture"
                    maxCount={1}
                    onChange={handleChangeTitleImage}
                >
                    {titleImage ? null : <UploadButton />}
                </Upload>
            </Form.Item>

            <Form.Item
                initialValue={title}
                label="Title:"
                name="title"
                rules={[{message: 'Required!', required: true}]}
            >
                <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
                initialValue={slug}
                label={`Slug, avoid spec symbols, slug from title: ${recommendedSlug}`}
                name="slug"
                normalize={textToSlug}
                rules={makeSlugValidator({id, mode, savedArticleList})}
            >
                <Input disabled={savedArticleList.length === 0} placeholder="slug-is-here" />
            </Form.Item>

            <Form.Item initialValue={articleType} label="Article type:" name="articleType">
                <Select<ArticleTypeEnum>>
                    <Option value={ArticleTypeEnum.article}>Article</Option>
                    <Option value={ArticleTypeEnum.container}>Container</Option>
                </Select>
            </Form.Item>

            <MarkdownInputWrapper mdInput={currentArticleState.content}>
                <Form.Item initialValue={content} label="Content, use markdown:" name="content">
                    <TextArea placeholder="# Markdown..." rows={10} />
                </Form.Item>
            </MarkdownInputWrapper>

            <MarkdownInputWrapper mdInput={currentArticleState.description}>
                <Form.Item initialValue={description} label="Description, use markdown:" name="description">
                    <TextArea placeholder="Some description is here..." rows={3} />
                </Form.Item>
            </MarkdownInputWrapper>

            <MarkdownInputWrapper mdInput={currentArticleState.descriptionShort}>
                <Form.Item
                    initialValue={descriptionShort}
                    label="Short description, use markdown:"
                    name="descriptionShort"
                >
                    <TextArea placeholder="Some short description is here..." rows={3} />
                </Form.Item>
            </MarkdownInputWrapper>

            <Form.Item
                // set on server
                initialValue={createdDate || noDateUTC}
                label="Created date UTC:"
                name="createdDate"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                // set on server
                initialValue={updatedDate || noDateUTC}
                label="Updated date UTC:"
                name="updatedDate"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item initialValue={moment(publishDate)} label="Publish date UTC:" name="publishDate">
                <DatePicker onOk={(date: Moment): void => setPublishDate(date.toISOString())} showTime />
            </Form.Item>

            <Form.Item label={`Files: ${fileList.length}`}>
                <Upload<unknown>
                    accept={fileAccept}
                    action={async (file: File): Promise<string> => {
                        const {uniqueFileName} = await uploadFile(file);

                        setFileList((currentFileList: Array<string>): Array<string> => {
                            return [...currentFileList, uniqueFileName];
                        });

                        // just prevent extra request to our server
                        return 'https://dev.null/dev/null';
                    }}
                    fileList={fileList.map((fileName: string): UploadFile<unknown> => {
                        return {
                            name: fileName,
                            status: 'done',
                            uid: fileName,
                            url: getPathToImage(fileName, {height: 96, width: 96}),
                        };
                    })}
                    itemRender={renderUploadedFileListItem}
                    listType="picture"
                    onChange={handleChangeFileList}
                >
                    <UploadButton />
                </Upload>
            </Form.Item>

            <Form.Item
                initialValue={hasMetaRobotsNoFollowSeo}
                label="Has Meta Robots No Follow:"
                name="hasMetaRobotsNoFollowSeo"
                valuePropName="checked"
            >
                <Checkbox>Add/combine &lt;meta name=&quot;robots&quot; content=&quot;nofollow&quot; /&gt;</Checkbox>
            </Form.Item>

            <Form.Item
                initialValue={hasMetaRobotsNoIndexSeo}
                label="Has Meta Robots No Index:"
                name="hasMetaRobotsNoIndexSeo"
                valuePropName="checked"
            >
                <Checkbox>
                    Add/combine &lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;/&gt; and add X-Robots-Tag:
                    noindex
                </Checkbox>
            </Form.Item>

            <Form.Item initialValue={isActive} label="Is Active:" name="isActive" valuePropName="checked">
                <Checkbox>Uncheck to temporary &quot;remove&quot;</Checkbox>
            </Form.Item>

            <Form.Item
                initialValue={isInSiteMapXmlSeo}
                label="Is In Site Map Xml:"
                name="isInSiteMapXmlSeo"
                valuePropName="checked"
            >
                <Checkbox>Does sitemap.xml has link to article or not</Checkbox>
            </Form.Item>

            <Form.Item
                initialValue={metaDescriptionSeo}
                label={'Meta Description, tag <meta type="description" content="..." />:'}
                name="metaDescriptionSeo"
            >
                <Input placeholder="Description..." />
            </Form.Item>

            <Form.Item
                initialValue={metaKeyWordsSeo}
                label={'Meta KeyWords, tag <meta type="keywords" content="..." />:'}
                name="metaKeyWordsSeo"
            >
                <Input placeholder="KeyWords..." />
            </Form.Item>

            <Form.Item
                initialValue={metaSeo}
                label="Meta, actually any valid html code:"
                name="metaSeo"
                rules={makeHtmlValidator()}
            >
                <TextArea placeholder="Additional meta tags..." rows={3} />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(stuffArtistList)}
                label={`Stuff Artists, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.stuffArtistList
                )}`}
                name="stuffArtistList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(stuffAuthorList)}
                label={`Stuff Authors, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.stuffAuthorList
                )}`}
                name="stuffAuthorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(stuffCompositorList)}
                label={`Stuff Compositors, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.stuffCompositorList
                )}`}
                name="stuffCompositorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(stuffDirectorList)}
                label={`Stuff Directors, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.stuffDirectorList
                )}`}
                name="stuffDirectorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(stuffIllustratorList)}
                label={`Stuff Illustrators, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.stuffIllustratorList
                )}`}
                name="stuffIllustratorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(stuffReaderList)}
                label={`Stuff Readers, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.stuffReaderList
                )}`}
                name="stuffReaderList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item initialValue={tagTitleSeo} label="Meta Title, tag <title>...</title>:" name="tagTitleSeo">
                <Input placeholder="Title..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(tagList)}
                label={`Tag List, use comma "," to divide: ${makeTagsPreview(currentArticleState.tagList)}`}
                name="tagList"
            >
                <Input placeholder="Tag1, Tag2, Tag3..." />
            </Form.Item>

            <Form.Item initialValue={subDocumentIdList} label="Sub Document Id List:" name="subDocumentIdList">
                <Select<Array<string>>
                    disabled={savedArticleList.length === 0}
                    filterOption
                    loading={savedArticleList.length === 0}
                    mode="multiple"
                    optionFilterProp="title"
                    placeholder="Sub Document Id..."
                >
                    {savedArticleList.map(makeSubDocumentOption)}
                </Select>
            </Form.Item>

            <Form.Item
                initialValue={subDocumentListViewType}
                label="Sub Document List View Type:"
                name="subDocumentListViewType"
            >
                <Select<SubDocumentListViewTypeEnum>>
                    <Option value={SubDocumentListViewTypeEnum.header}>Header</Option>
                    <Option value={SubDocumentListViewTypeEnum.headerImage}>Header-Image</Option>
                    <Option value={SubDocumentListViewTypeEnum.headerAudio}>Header-Audio</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
