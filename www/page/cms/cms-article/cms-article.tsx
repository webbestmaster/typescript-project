import {Form, Input, Button, Checkbox, Typography, Select} from 'antd';
import {ValidateErrorEntity, RuleObject, FieldData} from 'rc-field-form/lib/interface';

import 'antd/dist/antd.css';

import {ArticleType, ArticleTypeEnum, SubDocumentListViewTypeEnum} from '../../../../server/article/article-type';
import {waitForTime} from '../../../util/timeout';
import {validateArticle} from '../../../../server/article/article-validation';

const {Text, Link} = Typography;
const {Option} = Select;

type CmsArticlePropsType = {
    article: ArticleType;
    onSubmit: (article: ArticleType) => void;
};

export function CmsArticle(props: CmsArticlePropsType): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const {article, onSubmit} = props;
    const {
        articleType,
        content,
        createdDate,
        description,
        descriptionShort,
        fileList,
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

    const [form] = Form.useForm<ArticleType>();

    function onFinish(values: ArticleType) {
        console.log('onFinish:', values);
        console.log('onFinish:', article);
        // validate form
        const [isValidArticle, validateFunction] = validateArticle(values);

        console.log('onFinish, is valid -', isValidArticle);
        console.log('onFinish, values -', values);

        // form.validateFields().then(data => {
        //     console.log(data);
        //     console.log(data);
        //     console.log(data);
        //     console.log(data);
        // });
    }

    function onFinishFailed(errorInfo: ValidateErrorEntity<ArticleType>) {
        console.log('onFinishFailed:', errorInfo);
        console.log('onFinishFailed:', article);
    }

    function onValuesChange(changedValues: unknown, values: ArticleType) {
        console.log('onValuesChange:', changedValues, values);
        console.log('onValuesChange:', article);
    }

    function onFieldsChange(changedFields: Array<FieldData>, allFields: Array<FieldData>) {
        console.log('onFieldsChange:', changedFields, allFields);
        console.log('onFieldsChange:', article);
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
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
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
                initialValue={slug}
                label="Article slug:"
                name="slug"
                normalize={(value: unknown): string => String(value).trim()}
                rules={[
                    {
                        message: 'Please enter slug!',
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
                <Input />
            </Form.Item>

            <Form.Item name="sds">
                <Select<'lucy' | 'lucy'>
                    defaultValue="lucy"
                    onChange={(value: string) => {
                        console.log(`selected ${value}`);
                    }}
                    style={{width: 120}}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option disabled value="disabled">
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Form.Item>
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
