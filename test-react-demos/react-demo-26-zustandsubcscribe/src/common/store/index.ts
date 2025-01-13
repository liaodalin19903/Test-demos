import { create } from 'zustand';


import { createBearSlice, BearSlice } from './bear.store';
import { createProjSlice, ProjSlice } from './proj.store';
import { subscribeWithSelector } from 'zustand/middleware';



// 创建 store
// export const useBearWithSubStore = create<BearSlice>((...params) => ({
//   ...createBearSlice(...params)
// }))

export const useBearWithSubStore = create<BearSlice>()(
  subscribeWithSelector((...params) => ({
    ...createBearSlice(...params)
  }))
)


export const useProjStore = create<ProjSlice>((...params) => ({
  ...createProjSlice(...params)
}))
