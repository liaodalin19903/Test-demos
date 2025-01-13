import { create } from 'zustand'

import { createProjSlice } from './proj.store'

import { ProjSlice } from './proj.store'

type StoreState = ProjSlice // & OtherSlice

export const useStore = create<StoreState>()((...params) => ({
  ...createProjSlice(...params)
}))
