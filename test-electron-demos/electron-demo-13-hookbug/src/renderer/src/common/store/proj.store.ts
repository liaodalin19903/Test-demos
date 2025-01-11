import { StateCreator } from "zustand";

export interface ProjSlice {
  projs: [],
  selectedProj:  undefined,
}

export const createProjSlice: StateCreator<ProjSlice> = (set, get) => ({
  projs: [],
  selectedProj: undefined
})
