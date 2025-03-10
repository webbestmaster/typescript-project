/* global File */

import {red} from "@ant-design/colors";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Form,
    Input,
    message,
    Popconfirm,
    Select,
    Typography,
    Upload,
} from "antd";
import type {UploadChangeParam, UploadFile} from "antd/es/upload/interface";
import dayjs, {type Dayjs} from "dayjs";
import utc from "dayjs/plugin/utc";
import type {FieldData, ValidateErrorEntity} from "rc-field-form/lib/interface";
import {type JSX, useEffect, useState} from "react";
import {Link} from "react-router-dom";

function innerInitialization(): undefined {
    dayjs.extend(utc);
}

innerInitialization();

import {rootArticleId} from "../../../../server/article/article-const";
import {makeDefaultArticleFile} from "../../../../server/article/article-helper";
import {
    type ArticleFileType,
    type ArticleType,
    ArticleTypeEnum,
    SubDocumentListViewTypeEnum,
} from "../../../../server/article/article-type";
import {validateArticle} from "../../../../server/article/article-validation";
import type {PaginationResultType} from "../../../../server/data-base/data-base-type";
import {getArticleLinkToViewClient} from "../../../client-component/article/article-helper";
import {Box} from "../../../layout/box/box";
import {IsRender} from "../../../layout/is-render/is-render";
import {MarkdownInputWrapper} from "../../../layout/markdown-input-wrapper/markdown-input-wrapper";
import {Spinner} from "../../../layout/spinner/spinner";
import {getArticleListPaginationPick} from "../../../service/article/article-api";
import {throwError} from "../../../util/error";
import {useMakeExecutableState} from "../../../util/function";
import {
    arrayToStringByComma,
    humanNormalizeString,
    makeTagsPreview,
    stringToArrayByComma,
    textToSlug,
} from "../../../util/human";
import {HotKeyModifierEnum, useHotKey} from "../../../util/use-hot-key";
import {
    CmsArticleModeEnum,
    fileSizeLimit,
    imageAccept,
    imageFileSizeLimit,
    keyForValidationList,
    noDateUTC,
} from "./cms-article-const";
import {
    getAbsentIdList,
    getArticleLinkToEdit,
    getIsImage,
    handleDeleteArticle,
    makeHtmlValidator,
    makeSlugValidator,
    uploadFile,
} from "./cms-article-helper";
import {
    getParentList,
    makeFileListItem,
    makeSubDocumentOption,
    renderParentList,
    UploadButton,
} from "./cms-article-layout";
import type {ArticleForValidationType} from "./cms-article-type";
import {renderUploadedFileListItem} from "./render-uploaded-file-list-item";

const {Text: TypographyText, Title} = Typography;
const {Option} = Select;
const {TextArea} = Input;

interface CmsArticlePropsType {
    readonly article: ArticleType;
    readonly mode: CmsArticleModeEnum;
    readonly onFinish: (article: ArticleType) => Promise<void>;
}

// eslint-disable-next-line max-statements
export function CmsArticle(props: CmsArticlePropsType): JSX.Element {
    const {article, onFinish, mode} = props;
    const {
        articleType,
        content,
        createdDate,
        description,
        descriptionShort,
        fileList: defaultFileList,
        hasMetaRobotsNoFollowSeo,
        hasMetaRobotsNoIndexSeo,
        id,
        isActive,
        isInSiteMapXmlSeo,
        metaDescriptionSeo,
        metaKeyWordsSeo,
        metaSeo,
        publishDate: defaultPublishDate,
        slug,
        staffArtistList,
        staffAuthorList,
        staffCompositorList,
        staffDirectorList,
        staffIllustratorList,
        staffReaderList,
        subDocumentIdList,
        subDocumentListViewType,
        tagList,
        tagTitleSeo,
        title,
        titleImage: defaultTitleImage,
        updatedDate,
    } = article;

    const [form] = Form.useForm<ArticleType>();
    const [fileList, setFileList] = useState<Array<ArticleFileType>>([...defaultFileList]);
    const [titleImage, setTitleImage] = useState<ArticleFileType>(defaultTitleImage);
    const [publishDate, setPublishDate] = useState<string>(defaultPublishDate || new Date().toISOString());
    const [recommendedSlug, setRecommendedSlug] = useState<string>(textToSlug(title));
    const [currentArticleState, setCurrentArticleState] = useState<ArticleType>(article);
    const [isFileLoading, setIsFileLoading] = useState<boolean>(false);

    useHotKey({
        code: "KeyS",
        handleHotKey: form.submit,
        modifierList: [HotKeyModifierEnum.ctrl],
    });

    const {execute: executeArticleListPaginationPick} = useMakeExecutableState<
        Parameters<typeof getArticleListPaginationPick<keyof ArticleForValidationType>>,
        PaginationResultType<ArticleForValidationType>
    >(getArticleListPaginationPick);

    const [savedArticleList, setSavedArticleList] = useState<ReadonlyArray<ArticleForValidationType>>([]);

    useEffect(() => {
        executeArticleListPaginationPick(
            {},
            {
                pageIndex: 0,
                pageSize: 0,
                sort: {title: 1},
            },
            keyForValidationList
        )
            .then((data: PaginationResultType<ArticleForValidationType>) => {
                setSavedArticleList(data.list);
            })
            .catch((error: Error): void => {
                console.log(error);

                message.error("Can not fetch article list.");
            });
    }, [executeArticleListPaginationPick]);

    function onFinishForm(rawValues: ArticleType): undefined {
        const values: ArticleType = {
            ...rawValues,
            fileList,
            publishDate,
            staffArtistList: stringToArrayByComma(rawValues.staffArtistList),
            staffAuthorList: stringToArrayByComma(rawValues.staffAuthorList),
            staffCompositorList: stringToArrayByComma(rawValues.staffCompositorList),
            staffDirectorList: stringToArrayByComma(rawValues.staffDirectorList),
            staffIllustratorList: stringToArrayByComma(rawValues.staffIllustratorList),
            staffReaderList: stringToArrayByComma(rawValues.staffReaderList),
            tagList: stringToArrayByComma(rawValues.tagList),
            title: humanNormalizeString(rawValues.title),
            titleImage,
        };
        // Validate form
        const [isValidArticle, validateFunction] = validateArticle(values);

        console.info("validateFunction.errors");
        console.info(validateFunction.errors);
        console.log("onFinishForm, is valid -", isValidArticle);
        console.log("---> onFinishForm, values -", values);
        console.log("---> onFinishForm, fileList -", fileList);

        if (isValidArticle) {
            onFinish(values).catch(throwError);
            return;
        }

        message.error(JSON.stringify(validateFunction.errors));
    }

    function onFinishFailedForm(errorInfo: ValidateErrorEntity<ArticleType>): undefined {
        message.error(JSON.stringify(errorInfo.errorFields));
        console.log("onFinishFailedForm:", errorInfo);
        console.log("onFinishFailedForm:", article);
    }

    function onValuesChangeForm(changedValues: unknown, values: ArticleType): undefined {
        setRecommendedSlug(textToSlug(values.title));
        setCurrentArticleState(values);
        console.log("onValuesChangeForm:", changedValues, values);
        console.log("onValuesChangeForm:", article);
    }

    function onFieldsChangeForm(
        changedFields: Array<FieldData<ArticleType>>,
        allFields: Array<FieldData<ArticleType>>
    ): undefined {
        console.log("onFieldsChangeForm:", changedFields, allFields);
        console.log("onFieldsChangeForm:", article);
    }

    function handleChangeFileList(info: UploadChangeParam<UploadFile<unknown>>): undefined {
        const {file} = info;

        if (file.status === "removed") {
            setFileList((currentFileList: Array<ArticleFileType>): Array<ArticleFileType> => {
                return currentFileList.filter((fileInfo: ArticleFileType): boolean => {
                    return fileInfo.name !== file.name;
                });
            });
        }

        console.log("handleChangeFileList:", info);
        console.log("handleChangeFileList:", article);
    }

    function handleChangeTitleImage(info: UploadChangeParam<UploadFile<unknown>>): undefined {
        const {file} = info;

        if (file.status === "removed") {
            setTitleImage(makeDefaultArticleFile());
        }

        console.log("handleChangeTitleImage:", info);
        console.log("handleChangeTitleImage:", article);
    }

    const absentIdList = getAbsentIdList(subDocumentIdList, savedArticleList);
    const parentList = getParentList(article, savedArticleList);
    const hasParent = parentList.length > 0;
    const isDisableToDelete = hasParent || id === rootArticleId;

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
            <Spinner isShow={isFileLoading} position="fixed" />
            <IsRender isRender={absentIdList.length > 0}>
                <Title level={4} type="danger">
                    Document has missing children, children Id:&nbsp;{absentIdList.join(", ")}
                </Title>
            </IsRender>

            <Box padding={[8, 0]}>
                <TypographyText>
                    Article:&nbsp;
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    &nbsp;|&nbsp;
                    <Link to={getArticleLinkToEdit(id)}>{slug}</Link>
                </TypographyText>
            </Box>

            <Box padding={[8, 0, 16]}>
                <TypographyText>Parents:&nbsp;{renderParentList(article, savedArticleList)}</TypographyText>
            </Box>

            <Form.Item hidden initialValue={id} label={`Article id: ${id}`} name="id">
                <Input disabled />
            </Form.Item>

            <Form.Item label={`Title image (to 16MB): ${titleImage.name}`}>
                <Upload<unknown>
                    accept={imageAccept}
                    action={async (file: File): Promise<string> => {
                        try {
                            setIsFileLoading(true);

                            const uploadedFileInfo: ArticleFileType = await uploadFile(file, imageFileSizeLimit);

                            setTitleImage(uploadedFileInfo);
                        } catch (error: unknown) {
                            const errorMessage = error instanceof Error ? error.message : "Too big file";

                            await message.error(errorMessage);
                        } finally {
                            setIsFileLoading(false);
                        }

                        // Just prevent extra request to our server
                        return "https://dev.null/dev/null";
                    }}
                    fileList={titleImage.size > 0 ? [titleImage].map(makeFileListItem) : []}
                    itemRender={(originNode: JSX.Element, file: UploadFile<unknown>): JSX.Element => {
                        return renderUploadedFileListItem({
                            file,
                            fileInfo: titleImage,
                            originNode,
                            setFileTitle: (updatedFileTitle: string) => {
                                setTitleImage({
                                    ...titleImage,
                                    title: updatedFileTitle,
                                });
                            },
                        });
                    }}
                    listType="picture"
                    maxCount={1}
                    onChange={handleChangeTitleImage}
                >
                    {titleImage.size > 0 ? null : <UploadButton />}
                </Upload>
            </Form.Item>

            <Form.Item
                initialValue={title}
                label="Title:"
                name="title"
                rules={[
                    {
                        message: "Required!",
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
                initialValue={slug}
                label={`Slug, avoid spec symbols, slug from title: ${recommendedSlug}`}
                name="slug"
                normalize={textToSlug}
                rules={makeSlugValidator({
                    id,
                    mode,
                    savedArticleList,
                })}
            >
                <Input disabled={savedArticleList.length === 0} placeholder="slug-is-here" />
            </Form.Item>

            <Form.Item initialValue={articleType} label="Article type:" name="articleType">
                <Select<ArticleTypeEnum>>
                    <Option value={ArticleTypeEnum.article}>Article</Option>
                    <Option value={ArticleTypeEnum.container}>Container</Option>
                    <Option value={ArticleTypeEnum.audioList}>Audio List</Option>
                    <Option value={ArticleTypeEnum.audioSingle}>Audio Single</Option>
                    <Option value={ArticleTypeEnum.audioChildrenList}>Audio Children List</Option>
                </Select>
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(tagList)}
                label={`Tag List, use comma "," to divide: ${makeTagsPreview(currentArticleState.tagList)}`}
                name="tagList"
            >
                <Input placeholder="Tag1, Tag2, Tag3..." />
            </Form.Item>

            <Form.Item
                initialValue={subDocumentListViewType}
                label="Sub Document List View Type:"
                name="subDocumentListViewType"
            >
                <Select<SubDocumentListViewTypeEnum>>
                    <Option value={SubDocumentListViewTypeEnum.header}>Header</Option>
                    <Option value={SubDocumentListViewTypeEnum.headerImage}>Header-Image</Option>
                </Select>
            </Form.Item>

            <Form.Item initialValue={subDocumentIdList} label="Sub Document List:" name="subDocumentIdList">
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

            <Form.Item
                initialValue={descriptionShort}
                label="Short description, plain text only, used for Open Graph, Twitter Card and markup schema (https://schema.org):"
                name="descriptionShort"
            >
                <TextArea placeholder="Some short description is here..." rows={3} />
            </Form.Item>

            <Form.Item label={`Files (image to 16MB, other to 75MB): ${fileList.length}`}>
                <Upload<unknown>
                    // ignored accept={fileAccept}
                    action={async (file: File): Promise<string> => {
                        try {
                            setIsFileLoading(true);

                            const sizeLimit = getIsImage(file.name) ? imageFileSizeLimit : fileSizeLimit;
                            const uploadedFileInfo: ArticleFileType = await uploadFile(file, sizeLimit);

                            setFileList((currentFileList: Array<ArticleFileType>): Array<ArticleFileType> => {
                                return [...currentFileList, uploadedFileInfo];
                            });
                        } catch (error: unknown) {
                            const errorMessage = error instanceof Error ? error.message : "Too big file";

                            message.error(errorMessage);
                        } finally {
                            setIsFileLoading(false);
                        }

                        // Just prevent extra request to our server
                        return "https://dev.null/dev/null";
                    }}
                    fileList={fileList.map(makeFileListItem)}
                    // ignored itemRender={renderUploadedFileListItem}
                    itemRender={(originNode: JSX.Element, file: UploadFile<unknown>): JSX.Element => {
                        const fileInfo = fileList.find((fileInfoIList: ArticleFileType): boolean => {
                            return fileInfoIList.name === file.name;
                        });

                        return renderUploadedFileListItem({
                            file,
                            fileInfo,
                            originNode,
                            setFileTitle: (updatedFileTitle: string) => {
                                if (fileInfo) {
                                    fileInfo.title = updatedFileTitle;
                                    setFileList([...fileList]);
                                }
                            },
                        });
                    }}
                    listType="picture"
                    onChange={handleChangeFileList}
                >
                    <UploadButton />
                </Upload>
            </Form.Item>

            <Form.Item initialValue={dayjs.utc(publishDate)} label="Publish date UTC-0:" name="publishDate">
                <DatePicker
                    onOk={(date: Dayjs): undefined => {
                        setPublishDate(date.toISOString());
                    }}
                    showTime
                />
            </Form.Item>

            <Form.Item
                // Set on server
                initialValue={createdDate || noDateUTC}
                label="Created date UTC-0:"
                name="createdDate"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                // Set on server
                initialValue={updatedDate || noDateUTC}
                label="Updated date UTC-0:"
                name="updatedDate"
            >
                <Input disabled />
            </Form.Item>

            <Divider orientation="center">SEO</Divider>

            <Form.Item initialValue={tagTitleSeo} label="Meta Title, tag <title>...</title>:" name="tagTitleSeo">
                <Input placeholder="Title..." />
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
                <Checkbox>Uncheck to temporary &quot;remove&quot; (also remove from sitemap.xml)</Checkbox>
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
                label="Meta Description, tag <meta name=description content=<...> />:"
                name="metaDescriptionSeo"
            >
                <Input placeholder="Description..." />
            </Form.Item>

            <Form.Item
                initialValue={metaKeyWordsSeo}
                label="Meta KeyWords, tag <meta name=keywords content=<...> />:"
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

            <Divider orientation="center">Staff</Divider>

            <Form.Item
                initialValue={arrayToStringByComma(staffArtistList)}
                label={`Staff Artists, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.staffArtistList
                )}`}
                name="staffArtistList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(staffAuthorList)}
                label={`Staff Authors, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.staffAuthorList
                )}`}
                name="staffAuthorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(staffCompositorList)}
                label={`Staff Compositors, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.staffCompositorList
                )}`}
                name="staffCompositorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(staffDirectorList)}
                label={`Staff Directors, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.staffDirectorList
                )}`}
                name="staffDirectorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(staffIllustratorList)}
                label={`Staff Illustrators, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.staffIllustratorList
                )}`}
                name="staffIllustratorList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item
                initialValue={arrayToStringByComma(staffReaderList)}
                label={`Staff Readers, use comma "," to divide: ${makeTagsPreview(
                    currentArticleState.staffReaderList
                )}`}
                name="staffReaderList"
            >
                <Input placeholder="Name1, Name2, Name3..." />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary">
                    Submit (ctrl+S)
                </Button>
                <IsRender isRender={mode === CmsArticleModeEnum.edit}>
                    &nbsp;
                    <Popconfirm
                        cancelText="No"
                        disabled={isDisableToDelete}
                        icon={<QuestionCircleOutlined style={{color: red.primary}} />}
                        okText="Delete"
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onConfirm={async (): Promise<void> => {
                            await handleDeleteArticle(id);
                        }}
                        title="Are you sure to delete the article？"
                    >
                        <Button disabled={isDisableToDelete} htmlType="button" type="default">
                            {isDisableToDelete ? "Can NOT delete, article has parent" : "Delete"}
                        </Button>
                    </Popconfirm>
                </IsRender>
            </Form.Item>
        </Form>
    );
}
