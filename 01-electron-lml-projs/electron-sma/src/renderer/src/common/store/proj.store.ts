import { subscribeWithSelector } from 'zustand/middleware';
import { Proj, ProjMod } from "@shared/db-entities/Proj";
import { StateCreator } from "zustand";
import {
  projsApi,
  addProjApi,
  updateProjApi,
  deleteProjApi,
  getProjMods,
} from  "@renderer/common/apis"

export interface ProjSlice {
  projs: Proj[],
  selectedProj: Proj | undefined,
  isLoading: boolean,

  selectProj: (projID: number) => void,
  fetchProjs: () => Promise<void>,
  addProjApi: (proj:Proj) => Promise<void>,
  updateProjApi: (proj:Proj) => Promise<void>,
  deleteProjApi: (id: number) => Promise<void>,

  projMods: ProjMod[],
  selectedProjMod: ProjMod | undefined,
  selectProjMod: (projModId: number) => Promise<void>,
  fetchProjMods: (projId: number) => Promise<void>,
}

//type SliceType = StateCreator<ProjSlice, [], [], ProjSlice>

export const createProjSlice: StateCreator<ProjSlice> = (set, get) => (
{
  // 1.状态
  projs: [] as Proj[],
  selectedProj: undefined as Proj | undefined,

  projMods: [] as ProjMod[],
  selectedProjMod: undefined as ProjMod | undefined,

  // 2.操作状态的actions

  isLoading: false, // 是否正在操作
  fetchProjs: async() => {
    try {
      set({ isLoading: true })
      const projs: Proj[] = await projsApi()

      set({ projs: projs })

      // 设置selectedProj和selectedProjMod
      const tmpSelectedProjs = projs.filter((proj) => proj.selected === true)

      if( tmpSelectedProjs.length > 0) {
        set({ selectedProj: tmpSelectedProjs[0] })

        const { selectedProj, fetchProjMods } = get()
        await fetchProjMods(selectedProj!.id!)  // 这里会自动设置selected
      }

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

  addProjApi: async(proj:Proj) => {
    try {
      set({ isLoading: true })
      await addProjApi(proj)
    } catch (error) {

    } finally {
      const { fetchProjs } = get(); // 通过get获取当前状态里的fetchProjs方法
      await fetchProjs()
      set({ isLoading: false })
    }
  },

  updateProjApi: async(proj: Proj) => {
    try {
      set({ isLoading: true })
      await updateProjApi(proj)
    } catch (error) {

    } finally {
      const { fetchProjs } = get(); // 通过get获取当前状态里的fetchProjs方法
      await fetchProjs()
      set({ isLoading: false })
    }
  },

  deleteProjApi: async(id: number) => {
    try {
      set({ isLoading: true })
      await deleteProjApi(id)
    } catch (error) {

    } finally {
      const { fetchProjs } = get(); // 通过get获取当前状态里的fetchProjs方法
      await fetchProjs()
      set({ isLoading: false })
    }
  },

  selectProjMod: async(projModId: number) => {

    // 基于projID获取Proj
    const { projMods } = get()
    const filteredProjMod = (projMods as ProjMod[]).filter((projMod: ProjMod) => projMod.id === projModId);

    set({selectedProjMod: filteredProjMod[0]})
  },

  fetchProjMods: async(projId: number) => {

    try {
      set({ isLoading: true })

      const projMods: ProjMod[] = await getProjMods(projId)
      set({ projMods: projMods })

      const { selectedProjMod } = get()
      if( !selectedProjMod ) {

        const mainProjMods: ProjMod[] = projMods.filter((projMod) => projMod.isMain === true);
        set({ selectedProjMod:  mainProjMods[0]})
      }

    } catch (error) {

    } finally {
      set({ isLoading: false })
    }

  },

}
)
