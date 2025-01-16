import { create } from 'zustand';


import { createBearSlice, BearSlice } from './bear.store';
import { createProjSlice, ProjSlice } from './proj.store';
import { subscribeWithSelector } from 'zustand/middleware';

type StoreState = ProjSlice  & BearSlice

// 创建 store
export const useStore = create<StoreState>()(subscribeWithSelector((...params) => ({
  ...createBearSlice(...params),
  ...createProjSlice(...params)
})))

export const useBearWithSubStore = create<BearSlice>()(
  subscribeWithSelector((...params) => ({
    ...createBearSlice(...params)
  }))
)


export const useProjStore = create<ProjSlice>((...params) => ({
  ...createProjSlice(...params)
}))
