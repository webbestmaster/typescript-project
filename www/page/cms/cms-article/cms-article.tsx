/* global fetch, FormData, Response, File */
import {useState} from 'react';
// node_modules/antd/lib/upload/index.d.ts
// TODO: set declare const Upload: UploadInterface<any>; TO declare const Upload: UploadInterface<unknown>;
// node_modules/antd/lib/upload/index.d.ts
// WARNING: set declare const Upload: UploadInterface<any>; TO declare const Upload: UploadInterface<unknown>;
import {Upload, Form, Input, Button, Typography, Select, Checkbox, DatePicker} from 'antd';
import moment, {Moment} from 'moment';
import {ValidateErrorEntity, RuleObject, FieldData} from 'rc-field-form/lib/interface';
import {UploadChangeParam, UploadFile} from 'antd/lib/upload/interface';
import {PlusOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from '../../../../server/article/article-type';
import {waitForTime} from '../../../util/timeout';
import {validateArticle} from '../../../../server/article/article-validation';
import {Box} from '../../../layout/box/box';
import {getPathToImage, uploadFile} from '../../../service/file/file';
import {arrayToStringByComma, stringToArrayByComma} from '../../../util/human';

const {Text, Link} = Typography;
const {Option} = Select;
const {TextArea} = Input;

type CmsArticlePropsType = {
    article: ArticleType;
    onFinish: (article: ArticleType) => void;
};

// eslint-disable-next-line complexity
export function CmsArticle(props: CmsArticlePropsType): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const {article, onFinish} = props;
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
        subDocumentIdList: defaultSubDocumentIdList,
        subDocumentListViewType,
        tagList,
        tagTitleSeo, // tag <title>....</title>
        title,
        titleImage: defaultTitleImage,
        updatedDate,
    } = article;

    const [fileList, setFileList] = useState<Array<string>>([...defaultFileList]);
    const [titleImage, setTitleImage] = useState<string>(defaultTitleImage);
    const [subDocumentIdList, setSubDocumentIdList] = useState<Array<string>>([...defaultSubDocumentIdList]);
    const [publishDate, setPublishDate] = useState<string>(defaultPublishDate || new Date().toISOString());

    const [form] = Form.useForm<ArticleType>();

    function onFinishForm(rawValues: ArticleType) {
        const values = {
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
            titleImage,
        };
        // validate form
        const [isValidArticle, validateFunction] = validateArticle(values);

        console.log('onFinishForm, is valid -', isValidArticle);
        console.log('---> onFinishForm, values -', values);
        console.log('---> onFinishForm, fileList -', fileList);

        // form.validateFields().then(data => {
        //     console.log(data);
        //     console.log(data);
        //     console.log(data);
        //     console.log(data);
        // });
    }

    function onFinishFailedForm(errorInfo: ValidateErrorEntity<ArticleType>) {
        console.log('onFinishFailedForm:', errorInfo);
        console.log('onFinishFailedForm:', article);
    }

    function onValuesChangeForm(changedValues: unknown, values: ArticleType) {
        console.log('onValuesChangeForm:', changedValues, values);
        console.log('onValuesChangeForm:', article);
    }

    function onFieldsChangeForm(changedFields: Array<FieldData>, allFields: Array<FieldData>) {
        console.log('onFieldsChangeForm:', changedFields, allFields);
        console.log('onFieldsChangeForm:', article);
    }

    function renderUploadedFileListItem(
        originNode: JSX.Element,
        file: UploadFile<unknown>,
        uploadedFileList: Array<UploadFile<unknown>>,
        actions: {download: () => void; preview: () => void; remove: () => void}
    ): JSX.Element {
        const {name} = file;

        return (
            <Box padding={[0, 0, 0, 0]}>
                {originNode}
                <div>{name}</div>
                <div>{uploadedFileList.indexOf(file)}</div>
                {/* <div>{JSON.stringify(file)}</div>*/}
            </Box>
        );
    }

    async function handleChangeFileList(info: UploadChangeParam<UploadFile<unknown>>) {
        const {file, fileList: newFileList} = info;

        if (file.status === 'removed') {
            setFileList((currentFileList: Array<string>): Array<string> => {
                return currentFileList.filter((fileName: string): boolean => fileName !== file.name);
            });
        }

        /*
        const {originFileObj} = file;

        if (originFileObj instanceof File) {
            const {uniqueFileName} = await uploadFile(originFileObj);

            setFileList((currentFileList: Array<string>): Array<string> => {
                return [...currentFileList, uniqueFileName];
            });
        }
*/

        console.log('handleChangeFileList:', info);
        console.log('handleChangeFileList:', article);
    }

    return (
        <Form<ArticleType>
            autoComplete="off"
            form={form}
            initialValues={{remember: true}}
            labelCol={
                {
                    // span: 9,
                    // offset: 1,
                }
            }
            layout="vertical"
            name="basic"
            onFieldsChange={onFieldsChangeForm}
            onFinish={onFinishForm}
            onFinishFailed={onFinishFailedForm}
            onValuesChange={onValuesChangeForm}
            wrapperCol={
                {
                    // span: 9,
                    // offset: 0,
                }
            }
        >
            <Form.Item
                initialValue={id}
                label={`Article id: ${id || 'N/A. Id generated automatically and can not be changed'}`}
                name="id"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                // WARNING: change it to initialValue={slug}
                // TODO: change it to initialValue={slug}
                initialValue={slug || 'slug just for test'}
                label="Article slug:"
                name="slug"
                normalize={(value: unknown): string => String(value).trim()}
                rules={[
                    {
                        message: 'Required!',
                        required: true,
                    },
                    {
                        message: 'Please enter another slug. This slug already exists.',
                        validator: async (rule: RuleObject, value: unknown) => {
                            // TODO: check slug for uniq
                            console.log(rule, value);
                            await waitForTime(300);
                            // throw error for show validation error
                            // throw new Error('asdasdsaasd')
                        },
                    },
                ]}
            >
                <Input placeholder="your-some-slug-here" />
            </Form.Item>
            <Form.Item initialValue={articleType} label="Article type:" name="articleType">
                <Select<ArticleTypeEnum>>
                    <Option value={ArticleTypeEnum.article}>Article</Option>
                    <Option value={ArticleTypeEnum.container}>Container</Option>
                    <Option value={ArticleTypeEnum.root}>Root</Option>
                </Select>
            </Form.Item>
            <Form.Item initialValue={content} label="Content, use markdown:" name="content">
                <TextArea placeholder="Some content is here..." rows={10} />
            </Form.Item>
            <Form.Item
                // WARNING: change it to initialValue={title}
                // TODO: change it to initialValue={title}
                initialValue={title || 'Some title'}
                label="Title:"
                name="title"
                // normalize={(value: unknown): string => String(value).replace(/\s+/gi, ' ')}
                rules={[{message: 'Required!', required: true}]}
            >
                <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
                // set on server
                initialValue={createdDate || new Date().toISOString()}
                label={`Created date UTC: ${new Date().toISOString()}`}
                name="createdDate"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                // set on server
                initialValue={updatedDate || new Date().toISOString()}
                label={`Updated date UTC: ${new Date().toISOString()}`}
                name="updatedDate"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                initialValue={moment(defaultPublishDate || publishDate)}
                label={`Publish date UTC: ${publishDate}`}
                name="publishDate"
            >
                <DatePicker
                    onOk={(date: Moment) => {
                        setPublishDate(date.toISOString());
                    }}
                    showTime
                />
            </Form.Item>
            <Form.Item initialValue={description} label="Description, use markdown:" name="description">
                <TextArea placeholder="Some description is here..." rows={3} />
            </Form.Item>
            <Form.Item initialValue={descriptionShort} label="Short description, use markdown:" name="descriptionShort">
                <TextArea placeholder="Some short description is here..." rows={3} />
            </Form.Item>
            <Form.Item label={`Files: ${fileList.length}`}>
                <Upload<unknown>
                    action={async (file: File): Promise<string> => {
                        const {uniqueFileName} = await uploadFile(file);

                        setFileList((currentFileList: Array<string>): Array<string> => {
                            return [...currentFileList, uniqueFileName];
                        });

                        // just prevent extra request to our server
                        return 'https://dev.null/dev/null';
                    }}
                    fileList={fileList.map((fileName: string): UploadFile<unknown> => {
                        return {name: fileName, status: 'done', uid: fileName, url: getPathToImage(fileName)};
                    })}
                    itemRender={renderUploadedFileListItem}
                    listType="picture-card"
                    onChange={handleChangeFileList}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{marginTop: 8}}>Upload</div>
                    </div>
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
            <Form.Item initialValue={metaSeo} label="Meta, actually any html code:" name="metaSeo">
                <TextArea placeholder="Additional meta tags..." rows={3} />
            </Form.Item>
            <Box padding={16}>
                <Form.Item
                    initialValue={arrayToStringByComma(stuffArtistList)}
                    label="Stuff Artists:"
                    name="stuffArtistList"
                >
                    <Input placeholder="Name1, Name2, Name3..." />
                </Form.Item>
                <Form.Item
                    initialValue={arrayToStringByComma(stuffAuthorList)}
                    label="Stuff Authors:"
                    name="stuffAuthorList"
                >
                    <Input placeholder="Name1, Name2, Name3..." />
                </Form.Item>
                <Form.Item
                    initialValue={arrayToStringByComma(stuffCompositorList)}
                    label="Stuff Compositors:"
                    name="stuffCompositorList"
                >
                    <Input placeholder="Name1, Name2, Name3..." />
                </Form.Item>
                <Form.Item
                    initialValue={arrayToStringByComma(stuffDirectorList)}
                    label="Stuff Directors:"
                    name="stuffDirectorList"
                >
                    <Input placeholder="Name1, Name2, Name3..." />
                </Form.Item>
                <Form.Item
                    initialValue={arrayToStringByComma(stuffIllustratorList)}
                    label="Stuff Illustrators:"
                    name="stuffIllustratorList"
                >
                    <Input placeholder="Name1, Name2, Name3..." />
                </Form.Item>
                <Form.Item
                    initialValue={arrayToStringByComma(stuffReaderList)}
                    label="Stuff Readers:"
                    name="stuffReaderList"
                >
                    <Input placeholder="Name1, Name2, Name3..." />
                </Form.Item>
            </Box>
            <Form.Item label={`Title image: ${titleImage}`}>
                <Upload<unknown>
                    action={async (file: File): Promise<string> => {
                        const {uniqueFileName} = await uploadFile(file);

                        setTitleImage(uniqueFileName);

                        // just prevent extra request to our server
                        return 'https://dev.null/dev/null';
                    }}
                    fileList={
                        titleImage
                            ? [{name: titleImage, status: 'done', uid: titleImage, url: getPathToImage(titleImage)}]
                            : []
                    }
                    itemRender={renderUploadedFileListItem}
                    listType="picture-card"
                    maxCount={1}
                    // onChange={handleChangeFileList}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{marginTop: 8}}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>
            <Form.Item initialValue={tagTitleSeo} label="Meta Title, tag <title>...</title>:" name="tagTitleSeo">
                <Input placeholder="Title..." />
            </Form.Item>
            <Form.Item initialValue={arrayToStringByComma(tagList)} label="Tag List:" name="tagList">
                <Input placeholder="Tag1, Tag2, Tag3..." />
            </Form.Item>

            <Form.Item initialValue={defaultSubDocumentIdList} label="Sub Document Id List:" name="subDocumentIdList">
                <Select<Array<string>> mode="multiple" placeholder="Sub Document Id...">
                    {['1', '2', '3'].map((documentId: string, index: number): JSX.Element => {
                        return (
                            <Option key={`${documentId}-${String(index)}`} value={documentId}>
                                {documentId}
                            </Option>
                        );
                    })}
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
