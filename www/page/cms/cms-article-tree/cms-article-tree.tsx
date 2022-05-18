/* global setTimeout */
import 'antd/dist/antd.css';
import React, {useState} from 'react';
import {Tree, Typography} from 'antd';
import {DataNode, EventDataNode} from 'rc-tree/lib/interface';

const initTreeData = [
    {
        title: 'Expand to load',
        key: '0',
    },
    {
        title: 'Expand to load',
        key: '1',
    },
    {
        title: 'Tree Node',
        key: '2',
        isLeaf: true,
    },
]; // It's just a simple demo. You can use tree map to optimize update perf.

import {CmsPage} from '../layout/cms-page/cms-page';
import {PromiseResolveType} from "../../../util/promise";

function updateTreeData(list: Array<DataNode>, key: string, children?: Array<DataNode>): Array<DataNode> {
    return list.map<DataNode>((node: DataNode): DataNode => {
        if (node.key === key) {
            return {...node, children};
        }

        if (node.children) {
            return {...node, children: updateTreeData(node.children, key, children)};
        }

        return node;
    });
}


const {Title} = Typography;

export function CmsArticleTree(): JSX.Element {
    const [treeData, setTreeData] = useState<Array<DataNode>>(initTreeData);

    const onLoadData = (treeNode: EventDataNode): Promise<void> => {
        const {key, children} = treeNode;

        return new Promise((resolve: PromiseResolveType<void>) => {
            if (children) {
                resolve();
                return;
            }

            setTimeout(() => {

                setTreeData((origin: Array<DataNode>): Array<DataNode> => {
                        updateTreeData(origin, key, [
                            {
                                title: 'Child Node',
                                key: `${String(key)}-0`,
                            },
                            {
                                title: 'Child Node',
                                key: `${String(key)}-1`,
                            },
                        ]);
                    }
                );

                resolve();
            }, 1000);
        });
    }

    return (
        <CmsPage>
            <Title level={2}>Article tree</Title>
            <hr/>
            <Tree<DataNode>
                loadData={onLoadData}
                treeData={treeData}
            />
            <hr/>
            <Title level={2}>Article without parent:</Title>
            <h2>here should be article without parent</h2>
        </CmsPage>
    );
}
