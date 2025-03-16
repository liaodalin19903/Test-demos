import { Tree, Dropdown, Menu } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { DataNode } from 'antd/es/tree';

// 给定的 treeData
const givenTreeData: TreeDataNode[] = [
  {
    title: 'Folder 1',
    key: '1',
    children: [
      {
        title: 'File 1',
        key: '1-1'
      },
      {
        title: 'File 2',
        key: '1-2'
      }
    ]
  },
  {
    title: 'Folder 2',
    key: '2',
    children: [
      {
        title: 'File 3',
        key: '2-1'
      }
    ]
  }
];

const App: React.FC = () => {
  const menu = (
    <Menu
      items={[
        {
          key: 'add',
          label: <span>新增</span>,
        },
        {
          key: 'delete',
          label: <span>删除</span>,
        },
        {
          key: 'update',
          label: <span>编辑</span>,
        },
      ]}
    />
  );

  const titleRender = (nodeData: DataNode) => {
    // 确保 title 是 ReactNode 类型
    const getTitle = (): React.ReactNode => {
      if (typeof nodeData.title === 'function') {
        return (nodeData.title as (data: DataNode) => React.ReactNode)(nodeData);
      }
      return nodeData.title;
    };

    return (
      <Dropdown menu={{ items: menu.props.items }} trigger={['contextMenu']}>
        <div>{getTitle()}</div>
      </Dropdown>
    );
  };

  return (
    <div>
      <Tree
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        titleRender={titleRender}
        treeData={givenTreeData}
      />
    </div>
  );
};

export default App;