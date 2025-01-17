// fetchModules
import { SMAComboModule } from "@shared/db-entities/SMACombos";
import { StateCreator } from "zustand";
import {
  smaModulesApi,
  smaModulesWithCodefuncsApi,
  smaModulesWithCodefuncsAndCommonSupportsApi,  // modules + codefuncs + edge
  smaModuleCreateApi,
  smaModuleUpdateApi,
  smaModuleDeleteApi
} from  "@renderer/common/apis"

import { SMAComboModuleWithCodefuncsAndEdges } from '@shared/@types'
import { ComboData, CustomPluginOption, Graph, NodeData } from "@antv/g6";
import { SMANodeCodeFunc } from "@shared/db-entities";

const pluginsConfigMap = {
  gridline : { key: 'grid-line', type: 'grid-line', follow: false },
  minimap: { key: 'minimap', type: 'minimap', size: [120, 80] }
}

export interface SMAModuleSlice {
  modules: SMAComboModule[],
  modulesWithCodefuncs: SMAComboModule[],
  modulesWithCodefuncsAndEdges: SMAComboModuleWithCodefuncsAndEdges,
  selectedSMAModulesGraphCombos: ComboData[] | [],  // 模块主图-选中的模块
  setSelectedSMAModulesGraphCombos: (modules: ComboData[]) => void,
  selectedSMAModulesGraphNodes: NodeData[] | [],
  setSelectedSMAModulesGraphNodes: (nodes: NodeData[]) => void,

  // 选中一个module时候，选中一个node时候
  selectedOneSMAModulesGraphCombo: ComboData | undefined,
  setSelectedOneSMAModulesGraphCombo: (combo: ComboData | undefined) => void,
  selectedOneSMAModulesGraphNode: NodeData | undefined,
  setSelectedOneSMAModulesGraphNode: (node: NodeData | undefined) => void,

  isLoading: boolean,

  fetchModules: (projModId: number) => Promise<void>,
  fetchModulesWithCodefuncs: (projModId: number) => Promise<void>,
  fetchModulesWithCodefuncsAndEdges: (projModId: number) => Promise<void>,

  addModule: (module: SMAComboModule, projModId: number) => Promise<void>,
  updateModule: (module: SMAComboModule) => Promise<void>,
  deleteModule: (id: number) => Promise<void>,

  plugins: (string | CustomPluginOption | ((this: Graph) => CustomPluginOption))[],
  setPlugins: (plugins: []) => void

}

export const createSMAModuleSlice: StateCreator<SMAModuleSlice> = (set, get) => ({

  // 1.状态
  modules: [] as SMAComboModule[],
  modulesWithCodefuncs:  [] as SMAComboModule[],
  modulesWithCodefuncsAndEdges: {
    modules: [],
    codefuncEdges: []
  },

  //# region 选中的combos和nodes
  selectedSMAModulesGraphCombos: [],
  setSelectedSMAModulesGraphCombos: (modules: ComboData[]) => {
    set({ selectedSMAModulesGraphCombos: modules })

    if(modules && modules.length === 1) {
      const { setSelectedOneSMAModulesGraphCombo } = get()
      setSelectedOneSMAModulesGraphCombo(modules[0])
    }
  },

  selectedSMAModulesGraphNodes: [],
  setSelectedSMAModulesGraphNodes: (nodes: NodeData[]) => {
    set({selectedSMAModulesGraphNodes: nodes})

    if(nodes && nodes.length === 1) {
      const { setSelectedOneSMAModulesGraphNode } = get()
      setSelectedOneSMAModulesGraphNode(nodes[0])
    }
  },
  //#endregion

  //#region 选中的一个combo或node
  selectedOneSMAModulesGraphCombo: undefined,
  setSelectedOneSMAModulesGraphCombo: (combo: ComboData | undefined) => {
    set({ selectedOneSMAModulesGraphCombo: combo })
  },
  selectedOneSMAModulesGraphNode: undefined,
  setSelectedOneSMAModulesGraphNode: (node: NodeData | undefined) => {
    set({ selectedOneSMAModulesGraphNode: node })
  },
  //#endregion

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

  fetchModulesWithCodefuncsAndEdges: async(projModId: number) => {
    try {
      set({ isLoading: true })

      const modulesWithCodefuncsAndEdges = await smaModulesWithCodefuncsAndCommonSupportsApi(projModId)
      //console.log('store: modulesWithCodefuncsAndEdges: ', modulesWithCodefuncsAndEdges)
      set({ modulesWithCodefuncsAndEdges: modulesWithCodefuncsAndEdges })

    } catch (error) {

    } finally {
      set({ isLoading: false })
    }
  },


  addModule: async(
    module: SMAComboModule, projModId: number
  ) => {
    try {
      set({ isLoading: true })

      console.log('addModule: module.parentId ', module.parentId)

      await smaModuleCreateApi(
        module.moduleName,
        module.path,
        projModId,
        module.desc,
        //@ts-ignore
        module.parentId ? parseInt(module.parentId) : undefined
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

      const projModId = module.projMod.id!

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

  // modules graph的插件
  plugins: [
    pluginsConfigMap.gridline, // 网格线插件
    //pluginsConfigMap.minimap
  ],
  setPlugins: (plugins: (string | CustomPluginOption | ((this: Graph) => CustomPluginOption))[]) => {
    set({ plugins: plugins })
  }

})


