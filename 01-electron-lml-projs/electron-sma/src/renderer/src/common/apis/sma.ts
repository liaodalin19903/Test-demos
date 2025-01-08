import { trpc } from './trpcClient/index'

export const addModule = async(
  moduleName: string,
  path: string, // 新增 path 字段
  projModId: number, // 需要传入所属 ProjMod 的 ID
  desc?: string | undefined,
  parentId?: number, // 如果有父模块，可以传入父模块的 ID
) => {
  const module = await trpc.smaModuleCreate.mutate({
    moduleName,
    path,
    projModId,
    desc,
    parentId
  });

  return module
}
