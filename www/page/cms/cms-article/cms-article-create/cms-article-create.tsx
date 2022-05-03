// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import {Layout, Menu, Breadcrumb, Row, Col, Slider} from 'antd';
import {ItemType} from 'antd/lib/menu/hooks/useItems';

const {Header, Content, Footer} = Layout;

import {CmsArticle} from '../cms-article';
import {makeDefaultArticle} from '../cms-article-helper';

function handleOnUpdate() {
    console.log('handleOnUpdate');
}

// https://ant.design/components/grid/#Row
//

// eslint-disable-next-line import/no-default-export
export default function CmsArticleCreate(): JSX.Element {
    return (
        <Layout>
            <Header>
                {/* <div className="logo"/>*/}
                <Menu
                    defaultSelectedKeys={['2']}
                    items={Array.from({length: 15})
                        .fill(null)
                        .map((value: unknown, index: number): ItemType => {
                            return {key: String(index + 1), label: String(index + 1)};
                        })}
                    mode="horizontal"
                    theme="dark"
                />
            </Header>

            <Content>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

                <Row gutter={16}>
                    <CmsArticle article={makeDefaultArticle()} onUpdate={handleOnUpdate} />
                </Row>
            </Content>

            <Footer>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}
