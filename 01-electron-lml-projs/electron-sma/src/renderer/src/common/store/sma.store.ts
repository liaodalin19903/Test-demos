// fetchModules
import { SMAComboModule } from "@shared/db-entities/SMACombos";
import { StateCreator } from "zustand";
import {
  smaModulesApi,
  smaModulesWithCodefuncsApi,
  smaModuleCreateApi,
  smaModuleUpdateApi,
  smaModuleDeleteApi
} from  "@renderer/common/apis"

export interface SMAModuleSlice {
  modules: SMAComboModule[],
  modulesWithCodefuncs: SMAComboModule[],
  selectedSMAModulesGraphModule: SMAComboModule | undefined,  // 模块主图-选中的模块
  isLoading: boolean,

  fetchModules: (projModId: number) => Promise<void>,
  fetchModulesWithCodefuncs: (projModId: number) => Promise<void>,
  selectModulesGraphModule: (projID: number) => void,  // 模块主图 - 选择模块
  addModule: (module: SMAComboModule, projModId: number) => Promise<void>,
  updateModule: (module: SMAComboModule) => Promise<void>,
  deleteModule: (id: number) => Promise<void>,

}

export const createSMAModuleSlice: StateCreator<SMAModuleSlice> = (set, get) => ({

  // 1.状态
  modules: [] as SMAComboModule[],
  modulesWithCodefuncs:  [] as SMAComboModule[],
  selectedSMAModulesGraphModule: undefined as SMAComboModule | undefined,

  // 2.操作状态的actions
  isLoading: false, // 是否正在操作
  fetchModules: async(projModId: number) => {

    try {
      set({ isLoading: true })

      const modules: SMAComboModule[] = await smaModulesApi(projModId)

      set({ modules: modules })
    } catch (error) {

    } finally {
      set({ isLoading: false })
    }
  },

  fetchModulesWithCodefuncs: async(projModId: number) => {
    try {
      set({ isLoading: true })

      const modules: SMAComboModule[] = await smaModulesWithCodefuncsApi(projModId)

      set({ modulesWithCodefuncs: modules })
    } catch (error) {

    } finally {
      set({ isLoading: false })
    }
  },

  // 选择项目
  selectModulesGraphModule: (moduleId: number) => {

    // 基于projID获取Proj
    const { modules } = get()
    const filteredModules = (modules as SMAComboModule[]).filter((module: SMAComboModule) => module.id === moduleId);

    set({ selectedSMAModulesGraphModule: filteredModules[0] })
  },

  addModule: async(
    module: SMAComboModule, projModId: number
  ) => {
    try {
      set({ isLoading: true })
      await smaModuleCreateApi(
        module.moduleName,
        module.path,
        projModId,
        module.desc,
        module.parent ? module.parent.id : undefined
      )
    } catch (error) {
      console.log('lml: store: ', error)
    } finally {
      const { fetchModules } = get(); // 通过get获取当前状态里的fetchProjs方法
      fetchModules(projModId)
      set({ isLoading: false })
    }
  },

  updateModule: async(module: SMAComboModule) => {
    try {
      set({ isLoading: true })
      await smaModuleUpdateApi(module)
    } catch (error) {

    } finally {
      const { fetchModules } = get(); // 通过get获取当前状态里的fetchProjs方法

      const projModId = module.combo?.projMod.id!

      fetchModules(projModId)
      set({ isLoading: false })
    }
  },

  deleteModule: async(id: number) => {
    try {
      set({ isLoading: true })
      await smaModuleDeleteApi(id)
    } catch (error) {

    } finally {
      const { fetchModules } = get(); // 通过get获取当前状态里的fetchProjs方法
      //fetchModules() TODO
      set({ isLoading: false })
    }
  },

})


