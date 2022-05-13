import {Layout, Menu} from 'antd';

import {Box} from '../../../../layout/box/box';

const {Header, Content, Footer} = Layout;

type CmsPagePropsType = {
    children: Array<JSX.Element> | JSX.Element;
};

export function CmsPage(props: CmsPagePropsType): JSX.Element {
    const {children} = props;

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
                <Content>{children}</Content>
            </Box>

            <Footer>Footer is here</Footer>
        </Layout>
    );
}
