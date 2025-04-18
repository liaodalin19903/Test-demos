import React, { useEffect, useMemo, useState } from 'react';
import { Input, Tree, Menu, Popover, Button } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { DownOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { Search } = Input;

// 获取父节点 Key
const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key | null => {
  for (const node of tree) {
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        return node.key;
      }
      const parentKey = getParentKey(key, node.children);
      if (parentKey !== null) {
        return parentKey;
      }
    }
  }
  return null;
};

const isDirectory = (node: TreeDataNode): boolean => {
  // 检查 node 是否有 children 属性
  if (node.children && node.children.length > 0) {
    return true;
  }

  // 检查 node.key 是否有后缀
  const keyParts = (node.key as string).split('/');
  const lastPart = keyParts[keyParts.length - 1];
  if (lastPart.includes('.')) {
    return false;
  }

  return true;
};

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

// 定义菜单项
const menuItems = [
  {
    key: '1',
    label: (
      <span>
        <MailOutlined />
        Option 1
      </span>
    ),
  },
  {
    key: '2',
    label: (
      <span>
        <AppstoreOutlined />
        Option 2
      </span>
    ),
  },
  {
    key: 'submenu',
    label: 'Submenu',
    icon: <SettingOutlined />,
    children: [
      {
        key: '3',
        label: 'Option 3',
      },
      {
        key: '4',
        label: 'Option 4',
      },
    ],
  },
];


const App: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData] = useState<TreeDataNode[]>(givenTreeData);
  const [open, setOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<TreeDataNode | null>(null);

  // 搜索框变化事件
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = treeData
      .flatMap((item) => findMatchingKeys(item, value))
      .filter((key, i, self): key is React.Key => !!(key && self.indexOf(key) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const findMatchingKeys = (node: TreeDataNode, value: string): React.Key[] => {
    const matchingKeys: React.Key[] = [];
    const strTitle = String(node.title);

    // 如果当前节点匹配，添加当前节点的 key
    if (strTitle.toLowerCase().includes(value.toLowerCase())) {
      matchingKeys.push(node.key);

      // 添加父节点 key 以确保节点可见
      let parentKey = getParentKey(node.key, treeData);
      while (parentKey) {
        matchingKeys.push(parentKey);
        parentKey = getParentKey(parentKey, treeData);
      }
    }

    // 递归搜索子节点
    if (node.children) {
      node.children.forEach((child) => {
        matchingKeys.push(...findMatchingKeys(child, value));
      });
    }

    return matchingKeys;
  };

  // 动态生成过滤后的树数据
  const filteredTreeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] => {
      return data.filter((item) => {
        const strTitle = String(item.title);
        const isMatch = strTitle.toLowerCase().includes(searchValue.toLowerCase());
        const hasMatchingChildren = item.children && loop(item.children).length > 0;

        return isMatch || hasMatchingChildren;
      }).map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const displayTitle =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          );
        if (item.children) {
          const children = loop(item.children);
          return { title: strTitle, key: item.key, displayTitle, children };
        }
        return { title: strTitle, key: item.key, displayTitle };
      });
    };

    return loop(treeData);
  }, [searchValue, treeData]);

  // 勾选事件
  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  // 展开事件
  const onExpand: TreeProps['onExpand'] = (newExpandedKeys) => {
    console.log('onExpand', newExpandedKeys);
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // 处理 Tree 节点右键点击事件
  // @ts-ignore
  const handleRigthClick = ( e )=> {
    
    const { event, node } = e
    
    event.preventDefault();
    setOpen(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setSelectedNode(node);


    const isDir = isDirectory(node);
    if (isDir) {
      console.log('isDir:', node);
      // 这里需要进行弹出`右键Menu`


    } else {
      console.log('isFile:', node);
    }

    
  };

  // 处理菜单项点击事件
  const handleMenuItemClick = (e: { key: string }) => {
    setOpen(false);
    if (selectedNode) {
      console.log('Selected node:', selectedNode);
      console.log('Selected menu item key:', e.key);
      // 根据菜单项和节点信息执行相应操作
      switch (e.key) {
        case '1':
          console.log('Option 1 clicked on node:', selectedNode);
          break;
        case '2':
          console.log('Option 2 clicked on node:', selectedNode);
          break;
        case '3':
          console.log('Option 3 clicked on node:', selectedNode);
          break;
        case '4':
          console.log('Option 4 clicked on node:', selectedNode);
          break;
        default:
          console.log('Unknown option clicked');
      }
    }
  };

  return (
    <div>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} />
      <Tree
        showLine
        checkable
        switcherIcon={<DownOutlined />}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={filteredTreeData}
        //@ts-ignore
        titleRender={(nodeData) => nodeData.displayTitle}
        //@ts-ignore
        onRightClick={handleRigthClick}
      />

      <Popover
        content={
          <Menu items={menuItems} onClick={handleMenuItemClick} />
        }
        trigger="contextMenu"
        open={open}
        onOpenChange={(newOpen) => setOpen(newOpen)}
        placement="bottomLeft"
        getPopupContainer={() => document.body}
        style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
      >
        {/* 这里的 Button 只是占位，实际不会显示 */}
        <Button style={{ display: 'none' }} />
      </Popover>
    </div>
  );
};

export default App;