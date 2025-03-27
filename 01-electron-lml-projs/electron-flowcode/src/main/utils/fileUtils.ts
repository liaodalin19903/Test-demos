import fs from 'fs';
import path from 'path';

// 定义 TreeDataNode 类型
export interface TreeDataNode {
  title: string;
  key: string;
  children?: TreeDataNode[];
}


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

/**
 * 创建文件工具方法。
 * @param filePath - 文件的绝对路径。
 * @param fileName - 文件名。
 * @param content - （可选）文件内容，默认为空字符串。
 * @throws 如果路径无效或文件创建失败，会抛出错误。
 */
export const createFile = (
  filePath: string,
  fileName: string,
  content: string = ''
): void => {
  try {
    // 检查路径是否存在
    if (!fs.existsSync(filePath)) {
      throw new Error(`路径不存在: ${filePath}`);
    }

    // 拼接完整文件路径
    const fullPath = path.join(filePath, fileName);

    // 检查文件是否已存在
    if (fs.existsSync(fullPath)) {
      throw new Error(`文件已存在: ${fullPath}`);
    }

    // 创建文件并写入内容
    fs.writeFileSync(fullPath, content, { encoding: 'utf-8' });
    console.log(`文件创建成功: ${fullPath}`);
  } catch (error) {
    console.error('文件创建失败:', error);
    throw error; // 抛出错误以便调用方处理
  }
};

export const readFile = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * 判断文件是否存在。
 * @param filePath - 文件的完整路径。
 * @returns 文件是否存在。
 */
export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

/**
 * 替换文件内容。
 * @param filePath - 文件的完整路径。
 * @param content - 新的内容。
 * @throws 如果路径无效或文件替换失败，会抛出错误。
 */
export const replaceFileContent = (
  filePath: string,
  content: string
): void => {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      throw new Error(`文件不存在: ${filePath}`);
    }

    // 写入新内容到文件
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
    console.log(`文件内容替换成功: ${filePath}`);
  } catch (error) {
    console.error('文件内容替换失败:', error);
    throw error; // 抛出错误以便调用方处理
  }
};
