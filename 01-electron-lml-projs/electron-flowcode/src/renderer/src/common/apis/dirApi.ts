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
