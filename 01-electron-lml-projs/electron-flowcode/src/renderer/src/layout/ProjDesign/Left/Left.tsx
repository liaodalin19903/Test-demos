import React, { useEffect, useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Left.css'

import { getDirTreeApi } from '@renderer/common/apis';

const { Search } = Input;

// 预定义的静态树形数据
/*
const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];
*/

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

export const Left: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);


    // 获取树形数据
    useEffect(() => {
      const fetchTreeData = async () => {
        try {
          const data = await getDirTreeApi('/Users/markleo/Desktop/Test-demos/01-electron-lml-projs/electron-flowcode/src');
          setTreeData(data);
        } catch (error) {
          console.error('Failed to fetch tree data:', error);
        }
      };

      fetchTreeData();
    }, []);

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
        titleRender={(nodeData) => nodeData.displayTitle}
      />
    </div>
  );
};
