/* global setTimeout */
import 'antd/dist/antd.css';
import React, {useState} from 'react';
import {Tree, Typography} from 'antd';
import {DataNode, EventDataNode} from 'rc-tree/lib/interface';
import {DownOutlined} from '@ant-design/icons';

import {CmsPage} from '../layout/cms-page/cms-page';
import {PromiseResolveType} from '../../../util/promise';

const {Title} = Typography;

const initTreeData: Array<DataNode> = [
    {
        key: '0',
        title: 'Expand to load',
    },
    {
        key: '1',
        title: 'Expand to load',
    },
    {
        isLeaf: true,
        key: '2',
        title: 'Tree Node',
    },
    {
        key: '3',
        title: <h1>Expand to load</h1>,
    },
];

function updateTreeData(list: Array<DataNode>, key: number | string, children?: Array<DataNode>): Array<DataNode> {
    return list.map<DataNode>((node: DataNode): DataNode => {
        if (node.key === key) {
            console.log('String(node.key) === String(key)');
            if (children) {
                return {...node, children};
            }

            return {
                key: node.key,
                title: node.title,
            };
        }

        if (node.children) {
            console.log('node.children');
            return {...node, children: updateTreeData(node.children, key, children)};
        }

        console.log('return node');
        return node;
    });
}

export function CmsArticleTree(): JSX.Element {
    const [treeData, setTreeData] = useState<Array<DataNode>>(initTreeData);

    function onLoadData(treeNode: EventDataNode): Promise<void> {
        const {key, children} = treeNode;

        return new Promise((resolve: PromiseResolveType<void>) => {
            if (children) {
                resolve();
                return;
            }

            setTimeout(() => {
                setTreeData((origin: Array<DataNode>): Array<DataNode> => {
                    return updateTreeData(origin, key, [
                        {
                            key: `${String(key)}-0`,
                            title: 'Child Node',
                        },
                        {
                            key: `${String(key)}-1`,
                            title: 'Child Node',
                        },
                    ]);
                });
                resolve();
            }, 1000);
        });
    }

    return (
        <CmsPage>
            <Title level={2}>Article tree (does not work into &lt;StrictMode/&gt;)</Title>
            <hr />
            {/* <pre>{JSON.stringify(treeData, null, 4)}</pre>*/}
            <hr />
            <Tree<DataNode> loadData={onLoadData} showLine switcherIcon={<DownOutlined />} treeData={treeData} />
            <hr />
            <Title level={2}>Article without parent:</Title>
            <h2>here should be article without parent</h2>
        </CmsPage>
    );
}
