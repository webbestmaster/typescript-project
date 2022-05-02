import {Form, Input, Button, Checkbox} from 'antd';
import {ValidateErrorEntity, RuleObject} from 'rc-field-form/lib/interface';
import 'antd/dist/antd.css';

import {ArticleType} from '../../../../server/article/article-type';
import {waitForTime} from '../../../util/timeout';

type CmsArticlePropsType = {
    article: ArticleType;
    onUpdate: (article: ArticleType) => void;
};

export function CmsArticle(props: CmsArticlePropsType): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const {article, onUpdate} = props;

    const [form] = Form.useForm<ArticleType>();

    function onFinish(values: ArticleType) {
        // form.validateFields().then(data => {
        //     console.log(data);
        //     console.log(data);
        //     console.log(data);
        //     console.log(data);
        // });
        console.log('Success:', values);
    }

    function onFinishFailed(errorInfo: ValidateErrorEntity<ArticleType>) {
        console.log('Failed:', errorInfo);
    }

    return (
        <Form<ArticleType>
            autoComplete="off"
            form={form}
            initialValues={{remember: true}}
            labelCol={{
                span: 8,
            }}
            layout="horizontal"
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{
                span: 16,
            }}
        >
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
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        message: 'Please input your username!',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        message: 'Please input your password!',
                        required: true,
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button htmlType="submit" type="primary">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
