import * as z from 'zod';
import { publicProcedure } from './trpcServer/procedure';
import { readDirectoryRecursively } from '../utils/fileUtils'; // 假设有一个工具函数用于递归读取目录

// 定义输入参数的验证规则
const getDirTreeInputSchema = z.object({
  path: z.string().nonempty('Path is required'),
});

/**
 * 获取文件树数据的 API。
 */
export const getDirTreeApi = publicProcedure
  .input(getDirTreeInputSchema) // 验证输入参数
  .query(async ({ input }) => {
    const { path } = input;

    try {
      console.log('Reading directory tree for path:', path);
      // 调用工具函数读取目录并生成树状结构
      const treeData = await readDirectoryRecursively(path);
      return treeData;
    } catch (error) {
      console.error('Error reading directory:', error);
      throw new Error(`Failed to read directory: ${error}`);
    }
  });
