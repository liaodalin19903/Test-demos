import fs from 'fs';
import path from 'path';

/**
 * 递归读取目录并生成 TreeDataNode 格式的文件树。
 * @param dirPath - 目录的绝对路径。
 * @returns 符合 TreeDataNode 结构的文件树数据。
 */
export const readDirectoryRecursively = (dirPath: string): TreeDataNode[] => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  return files.map((file) => {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory()) {
      // 如果是目录，则递归读取子目录
      return {
        title: file.name,
        key: fullPath,
        children: readDirectoryRecursively(fullPath),
      };
    } else {
      // 如果是文件，则直接返回节点
      return {
        title: file.name,
        key: fullPath,
      };
    }
  });
};

// 定义 TreeDataNode 类型
export interface TreeDataNode {
  title: string;
  key: string;
  children?: TreeDataNode[];
}
