import { Proj } from "@shared/db-entities/Proj";
import { StateCreator } from "zustand";
import { getProjs, addProj, updateProj, deleteProj } from  "@renderer/common/apis"

export interface ProjSlice {
  projs: Proj[],
  selectedProj: Proj | undefined,
  isLoading: boolean,

  selectProj: (projID: number) => void,
  fetchProjs: () => Promise<void>,
  addProj: (proj:Proj) => Promise<void>,
  updateProj: (proj:Proj) => Promise<void>,
  deleteProj: (id: number) => Promise<void>,
}

//type SliceType = StateCreator<ProjSlice, [], [], ProjSlice>

export const createProjSlice: StateCreator<ProjSlice> = (set, get) => ({

  // 1.状态
  projs: [] as Proj[],
  selectedProj: undefined as Proj | undefined,

  // 2.操作状态的actions

  isLoading: false, // 是否正在操作
  fetchProjs: async() => {
    try {
      set({ isLoading: true })
      const projs: Proj[] = await getProjs()

      set({ projs: projs })
    } catch (error) {

    } finally {
      set({ isLoading: false })
    }
  },

  // 选择项目
  selectProj: (projID: number) => {

    // 基于projID获取Proj
    const { projs } = get()
    const filteredProj = (projs as Proj[]).filter((proj: Proj) => proj.id === projID);

    set({ selectedProj: filteredProj[0] })
  },

  addProj: async(proj:Proj) => {
    try {
      set({ isLoading: true })
      await addProj(proj)
    } catch (error) {

    } finally {
      const { fetchProjs } = get(); // 通过get获取当前状态里的fetchProjs方法
      fetchProjs()
      set({ isLoading: false })
    }
  },

  updateProj: async(proj: Proj) => {
    try {
      set({ isLoading: true })
      await updateProj(proj)
    } catch (error) {

    } finally {
      const { fetchProjs } = get(); // 通过get获取当前状态里的fetchProjs方法
      fetchProjs()
      set({ isLoading: false })
    }
  },

  deleteProj: async(id: number) => {
    try {
      set({ isLoading: true })
      await deleteProj(id)
    } catch (error) {

    } finally {
      const { fetchProjs } = get(); // 通过get获取当前状态里的fetchProjs方法
      fetchProjs()
      set({ isLoading: false })
    }
  },

})
