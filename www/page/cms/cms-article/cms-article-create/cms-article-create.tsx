/* global alert */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import {Layout, Menu, Typography} from 'antd';
import {JSONSchemaType} from 'ajv';
// import {ItemType} from 'antd/lib/menu/hooks/useItems';

const {Title} = Typography;
const {Header, Content, Footer} = Layout;

import {CmsArticle} from '../cms-article';
import {makeDefaultArticle} from '../../../../../server/article/article-helper';
import {Box} from '../../../../layout/box/box';
import {CmsArticleModeEnum} from '../cms-article-const';
import {ArticleType} from '../../../../../server/article/article-type';
import {postArticleCreate} from '../../../../service/article/article-api';
import {useMakeExecutableState} from '../../../../util/function';
import {makeArticleSchema} from '../../../../../server/article/article-validation';
import {getRandomString} from '../../../../util/string';
import {Spinner} from '../../../../layout/spinner/spinner';

// eslint-disable-next-line import/no-default-export
export default function CmsArticleCreate(): JSX.Element {
    const {execute, isInProgress, result, error} = useMakeExecutableState<
        [ArticleType, JSONSchemaType<ArticleType>],
        ArticleType
    >(postArticleCreate);

    function handleOnFinish(article: ArticleType) {
        execute(article, makeArticleSchema())
            .then((savedArticle: ArticleType) => {
                console.log(savedArticle);
                // eslint-disable-next-line no-alert
                alert('DONE!');
            })
            .catch((requestError: Error) => {
                // eslint-disable-next-line no-alert
                alert(`ERROR: ${requestError.message}`);
            });
    }

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
                        article={{
                            ...makeDefaultArticle(),
                            id: getRandomString(),
                        }}
                        mode={CmsArticleModeEnum.create}
                        onFinish={handleOnFinish}
                    />
                </Content>
            </Box>

            <Footer>Footer is here</Footer>
            <Spinner isShow={isInProgress} position="fixed" />
        </Layout>
    );
}
