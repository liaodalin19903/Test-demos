import { trpc } from './trpcClient/index'
import { SMAComboModule } from '@shared/db-entities/SMACombos'

export const smaModulesApi = async(
  projModId: number, // 需要传入所属 ProjMod 的 ID
) => {
  const modules = await trpc.smaModulesApi.query({projModId})
  return modules
}

export const smaModulesWithCodefuncsApi = async(
  projModId: number, // 需要传入所属 ProjMod 的 ID
) => {
  const modules = await trpc.smaModulesWithCodefuncsApi.query({projModId})
  return modules
}

export const smaModulesWithCodefuncsAndCommonSupportsApi = async(
  projModId: number, // 需要传入所属 ProjMod 的 ID
) => {
  const modulesAndEdgesObj = await trpc.smaModulesWithCodefuncsAndCommonSupportsApi.query({projModId})
  return modulesAndEdgesObj
}

export const smaModuleCreateApi = async(
  moduleName: string, path: string, projModId: number, desc?: string | undefined, parentId?: number // 如果有父模块，可以传入父模块的 ID
) => {
  const module = await trpc.smaModuleCreateApi.mutate({
    moduleName,
    path,
    projModId,
    desc,
    parentId
  });

  return module
}

export const smaModuleUpdateApi = async(
  module: SMAComboModule
) => {
  const result = await trpc.smaModuleUpdateApi.mutate(module)
  return result
}

export const smaModuleDeleteApi = async(id: number) => {
  const result = await trpc.smaModuleDeleteApi.mutate({id})
  return result
}
