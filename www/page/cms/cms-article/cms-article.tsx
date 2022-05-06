import {Upload, Form, Input, Button, Typography, Select} from 'antd';
import {ValidateErrorEntity, RuleObject, FieldData} from 'rc-field-form/lib/interface';
import {UploadChangeParam, UploadFile} from 'antd/lib/upload/interface';
import {PlusOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

import {useState} from 'react';

import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from '../../../../server/article/article-type';
import {waitForTime} from '../../../util/timeout';
import {validateArticle} from '../../../../server/article/article-validation';
import {makeDefaultArticle} from '../../../../server/article/article-helper';
import {Box} from '../../../layout/box/box';
import {apiUrl} from '../../../../server/const';

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
        publishDate,
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
        titleImage,
        updatedDate,
    } = article;

    const [fileList, setFileList] = useState<Array<string>>([...defaultFileList]);

    const [form] = Form.useForm<ArticleType>();

    function onFinishForm(values: ArticleType) {
        // validate form
        const [isValidArticle, validateFunction] = validateArticle(values);

        console.log('onFinishForm, is valid -', isValidArticle);
        console.log('---> onFinishForm, values -', values);

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

    function handleChangeFileList(info: UploadChangeParam<UploadFile<unknown>>) {
        const {file, fileList: newFileList} = info;

        console.log('handleChangeFileList:', info);
        console.log('handleChangeFileList:', article);

        /*
        if (size > 75e6) {
            alert('Too big file, try to use file less than 75MB');
            return;
        }
*/
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
                <Input placeholder="enter-some-slug-here" />
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
                label="Title"
                name="title"
                // normalize={(value: unknown): string => String(value).replace(/\s+/gi, ' ')}
                rules={[{message: 'Required!', required: true}]}
            >
                <Input placeholder="Title" />
            </Form.Item>

            <Form.Item
                initialValue={createdDate || new Date().toISOString()}
                label={`Created date: ${new Date().toISOString()}`}
                name="createdDate"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                initialValue={updatedDate || new Date().toISOString()}
                label={`Updated date: ${new Date().toISOString()}`}
                name="updatedDate"
            >
                <Input disabled />
            </Form.Item>

            <Form.Item initialValue={description} label="Description, use markdown:" name="description">
                <TextArea placeholder="Some description is here..." rows={3} />
            </Form.Item>

            <Form.Item initialValue={descriptionShort} label="Short description, use markdown:" name="descriptionShort">
                <TextArea placeholder="Some short description is here..." rows={3} />
            </Form.Item>

            <Box>
                <Upload
                    action={apiUrl.uploadFile}
                    fileList={fileList.map((fileName: string) => {
                        return {
                            name: fileName,
                            status: 'done',
                            uid: fileName,
                            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        };
                    })}
                    listType="picture-card"
                    // onPreview={handlePreview}
                    onChange={handleChangeFileList}
                >
                    {fileList.length >= 8 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    )}
                </Upload>
            </Box>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {/*
            <Form.Item
                label="content"
                name="conte"
                rules={[
                    {
                        message: 'Please input your username!',
                        required: true,
                    },
                    {
                        message: ' 999999 Please input your username!',
                        validator: async (rule: RuleObject, value: unknown) => {
                            console.log(rule, value);
                            await waitForTime(300);
                            // throw error for show validation error
                            // throw new Error('asdasdsaasd')
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>
*/}
            {/*
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        message: 'Please input your username!',
                        // required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
*/}

            {/*
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        message: 'Please input your password!',
                        // required: true,
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
*/}

            {/*
            <Form.Item
                name="remember"
                valuePropName="checked"
                // wrapperCol={{ offset: 8, span: 16, }}
            >
                <Checkbox>
                    Remember me
                </Checkbox>
            </Form.Item>
*/}

            <Form.Item>
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
