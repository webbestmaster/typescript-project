import {Row, Col} from 'antd';

import {Box} from './box/box';
import {Markdown} from './markdown';

type MarkdownInputWrapperPropsType = {
    children: JSX.Element;
    mdInput: string;
};

export function MarkdownInputWrapper(props: MarkdownInputWrapperPropsType): JSX.Element {
    const {mdInput, children} = props;

    return (
        <Row gutter={[16, 0]}>
            <Col span={12}>{children}</Col>
            <Col span={12}>
                <Box backgroundColor="#fff" height="calc(100% - 54px)" margin={[32, 0, 16]} padding={[8]}>
                    <Markdown config={{useWrapper: false}} mdInput={mdInput} />
                </Box>
            </Col>
        </Row>
    );
}
