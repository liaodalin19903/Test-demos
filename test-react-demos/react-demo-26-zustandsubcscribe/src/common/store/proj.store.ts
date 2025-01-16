import { StateCreator } from "zustand";

export interface ProjSlice {
  projs: string[],
  addProj: () => void 
}

export const createProjSlice: StateCreator<ProjSlice, [], [["zustand/subscribeWithSelector", never]], ProjSlice> = (set, get) => ({
  projs: [],
  
  addProj: () => {
    const { projs } = get()
    //console.log(bears)

    const tmpProjs = projs 
    tmpProjs.push('1') 

    set({
      projs: tmpProjs
    })
  }
})