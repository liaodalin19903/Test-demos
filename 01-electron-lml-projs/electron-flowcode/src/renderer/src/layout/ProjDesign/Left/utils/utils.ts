import { TreeDataNode } from "antd";

export const isDirectory = (node: TreeDataNode): boolean => {
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
