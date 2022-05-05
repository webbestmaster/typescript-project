// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import {Layout, Menu, Typography} from 'antd';
// import {ItemType} from 'antd/lib/menu/hooks/useItems';

const {Title} = Typography;
const {Header, Content, Footer} = Layout;

import {CmsArticle} from '../cms-article';
import {makeDefaultArticle} from '../../../../../server/article/article-helper';
import {Box} from '../../../../layout/box/box';

function handleOnSubmit() {
    console.log('handleOnSubmit');
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
                    // TODO: check for change in doc API
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            label: 'article list',
                        },
                        {
                            key: '2',
                            label: 'article create',
                        },
                    ]}
                    mode="horizontal"
                    theme="dark"
                />
            </Header>

            <Box padding={16}>
                <Content>
                    <Title level={2}>Create new article</Title>

                    <CmsArticle article={makeDefaultArticle()} onSubmit={handleOnSubmit} />
                </Content>
            </Box>

            <Footer>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}
