import { trpc } from './trpcClient/index';

export const getDirTreeApi = async (path: string) => {
  try {
    // 确保调用的属性名与后端路由一致
    const dirTree = await trpc.getDirTreeApi.query({path});
    return dirTree;
  } catch (error) {
    console.error('Failed to fetch directory tree:', error);
    throw error; // 或者根据需求处理错误
  }
};

/**
 * 创建.fc.json 文件
 * @param path
 * @param filename
 * @returns
 */
export const addFlowcodeFileApi = async ({path, filename}) => {
  try {
    // 确保调用的属性名与后端路由一致
    await trpc.addFlowcodeFileApi.mutate({path, filename});
  } catch (error) {
    console.error('Failed to fetch directory tree:', error);
    throw error; // 或者根据需求处理错误
  }
};

/**
 * 读取json文件内容
 * @param path 绝对路径
 * @returns json内容
 */
export const readJsonFileApi = async (path: string) => {
  try {
    // 确保调用的属性名与后端路由一致
    const content = await trpc.readJsonFileApi.query({path});
    return content;
  } catch (error) {
    console.error('Failed to fetch directory tree:', error);
    throw error; // 或者根据需求处理错误
  }
};

/**
 * 存储
 * @param path: 替换文件路径
 * @param content: 替换的内容
 */
export const saveJsonFileApi = async (path: string, jsonData: object) => {
  try {
    // 确保调用的属性名与后端路由一致
    const content = JSON.stringify(jsonData);
    await trpc.saveJsonFileApi.mutate({path, content});
  } catch (error) {
    console.error('Failed to fetch directory tree:', error);
    throw error; // 或者根据需求处理错误
  }
};
