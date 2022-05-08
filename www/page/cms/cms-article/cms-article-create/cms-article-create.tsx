// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import {Layout, Menu, Typography} from 'antd';
// import {ItemType} from 'antd/lib/menu/hooks/useItems';

const {Title} = Typography;
const {Header, Content, Footer} = Layout;

import {CmsArticle} from '../cms-article';
import {makeDefaultArticle} from '../../../../../server/article/article-helper';
import {Box} from '../../../../layout/box/box';
import {CmsArticleModeEnum} from '../cms-article-const';
import {ArticleType} from '../../../../../server/article/article-type';

function handleOnFinish(article: ArticleType) {
    console.log('handleOnFinish');
    console.log(article);
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

                    <CmsArticle
                        article={makeDefaultArticle()}
                        mode={CmsArticleModeEnum.create}
                        onFinish={handleOnFinish}
                    />
                </Content>
            </Box>

            <Footer>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}
