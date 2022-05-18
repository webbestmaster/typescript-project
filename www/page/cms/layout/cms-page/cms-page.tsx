import {Layout, Menu} from 'antd';
import {MenuInfo} from 'rc-menu/lib/interface';
import {useLocation, useNavigate} from 'react-router-dom';

import {Box} from '../../../../layout/box/box';
import {appRoute} from '../../../../component/app/app-route';

const {Content, Footer} = Layout;

type CmsPagePropsType = {
    children: Array<JSX.Element> | JSX.Element;
};

export function CmsPage(props: CmsPagePropsType): JSX.Element {
    const {children} = props;
    const routerLocation = useLocation();
    const navigate = useNavigate();

    function handleMenuOnLick(menuInfo: MenuInfo) {
        const {key} = menuInfo;

        navigate(key);
    }

    return (
        <Layout>
            <Box padding={16}>
                <Menu
                    defaultSelectedKeys={[routerLocation.pathname]}
                    items={[
                        {
                            key: appRoute.articleList.path,
                            label: 'List',
                        },
                        {
                            key: appRoute.articleCreate.path,
                            label: 'Create',
                        },
                        {
                            key: appRoute.articleTree.path,
                            label: 'Tree',
                        },
                    ]}
                    mode="horizontal"
                    onClick={handleMenuOnLick}
                />
            </Box>

            <Box padding={16}>
                <Content>{children}</Content>
            </Box>

            <Footer>Footer is here</Footer>
        </Layout>
    );
}
