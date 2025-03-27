import { DatabaseFilled, HolderOutlined } from '@ant-design/icons';
import { useDnd } from '@antv/xflow';
import { Popover, Tree } from 'antd';
import React from 'react';

import { DAG_EXEC_NODE, DAG_JUDGE_NODE } from '../shape';

import styles from './dnd.module.less';
import SearchInput from './search';

const { DirectoryTree } = Tree;

type ComponentTreeItem = {
  category: string;
  docString: string;
  isLeaf: boolean;
  key: string;
  title: string;
  children?: ComponentTreeItem[];
  ports?: {
    id: string;
    group: string;
  }[];
};

const componentTreeData = [
  {
    category: '',
    docString: '',
    isLeaf: false,
    key: '分组一',
    title: '分组一',
    children: [
      {
        category: '分组一',
        docString: '执行节点',
        isLeaf: true,
        key: '1',
        title: '执行节点',
        ports: [
          {
            id: '1-1',
            group: 'bottom',
          },
        ],
      },
      {
        category: '分组一',
        docString: '判断节点',
        isLeaf: true,
        key: '2',
        title: '判断节点',
        ports: [
          {
            id: '2-1',
            group: 'top',
          },
          {
            id: '2-2',
            group: 'bottom',
          },
          {
            id: '2-3',
            group: 'bottom',
          },
        ],
      },
    ],
  },
  {
    category: '',
    docString: '',
    isLeaf: false,
    key: '分组二',
    title: '分组二',
    children: [
      {
        category: '分组二',
        docString: '场景测试',
        isLeaf: true,
        key: '3',
        title: '场景测试',
        ports: [
          {
            id: '3-1',
            group: 'top',
          },
          {
            id: '3-2',
            group: 'bottom',
          },
        ],
      },
      /*
      {
        category: '分组二',
        docString: '读取参数',
        isLeaf: true,
        key: '4',
        title: '读取参数',
        ports: [
          {
            id: '4-1',
            group: 'top',
          },
          {
            id: '4-2',
            group: 'bottom',
          },
        ],
      },
      */
    ],
  },
];

const Dnd = () => {
  let id = 0;
  const { startDrag } = useDnd();

  const handleMouseDown = (
    e: React.MouseEvent<Element, MouseEvent>,
    item: ComponentTreeItem,
  ) => {

    id += 1;

    if(item.key === '1') {
      startDrag(
        {
          id: id.toString(),
          shape: DAG_EXEC_NODE,
          data: {
            id: id.toString(),
            label: item.title,
            status: 'default',
          },
          ports: item.ports,
        },
        e,
      );
    }else if(item.key === '2') {
      startDrag(
        {
          id: id.toString(),
          shape: DAG_JUDGE_NODE,
          data: {
            id: id.toString(),
            label: item.title,
            status: 'default',
          },
          ports: item.ports,
        },
        e,
      );
    }else if(item.key === '3') {
      startDrag(
        {
          id: id.toString(),
          shape: DAG_EXEC_NODE,
          data: {
            id: id.toString(),
            label: item.title,
            status: 'default',
          },
          ports: item.ports,
        },
        e,
      );
    }



  };

  const [searchComponents, setSearchComponents] = React.useState<ComponentTreeItem[]>(
    [],
  );

  const handleSearchComponent = (keyword?: string) => {
    if (!keyword) {
      setSearchComponents([]);
      return;
    }
    const searchResult = componentTreeData.flatMap((group) =>
      group.children.filter((child) =>
        child.title.toLowerCase().includes(keyword.toLowerCase()),
      ),
    );
    setSearchComponents(searchResult);
  };

  const treeNodeRender = (treeNode: ComponentTreeItem) => {
    const { isLeaf, docString, title } = treeNode;
    if (isLeaf) {
      return (
        <Popover
          content={
            <div
              style={{
                width: 200,
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
              }}
            >
              {docString}
            </div>
          }
          placement="right"
        >
          <div
            className={styles.node}
            onMouseDown={(e) => handleMouseDown(e, treeNode)}
          >
            <div className={styles.nodeTitle}>
              <span className={styles.icon}>
                <DatabaseFilled style={{ color: '#A1AABC' }} />
              </span>
              <span>{title}</span>
            </div>
            <div className={styles.nodeDragHolder}>
              <HolderOutlined />
            </div>
          </div>
        </Popover>
      );
    } else {
      return <span className={styles.dir}>{title}</span>;
    }
  };

  return (
    <div className={styles.components}>
      <div className={styles.action}>
        <SearchInput
          className={styles.search}
          placeholder="请输入搜索关键字"
          onSearch={(key) => handleSearchComponent(key)}
        ></SearchInput>
      </div>
      {componentTreeData.length && (
        <DirectoryTree
          rootClassName={styles.tree}
          blockNode
          showIcon={false}
          defaultExpandAll
          titleRender={(node) => treeNodeRender(node)}
          treeData={searchComponents.length ? searchComponents : componentTreeData}
        ></DirectoryTree>
      )}
    </div>
  );
};

export { Dnd };
