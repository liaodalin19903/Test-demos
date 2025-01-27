import { create } from 'zustand'
import { createProjSlice, ProjSlice } from './proj.store'
import { BearSlice, createBearSlice } from './bear.store'

import { subscribeWithSelector } from "zustand/middleware";


type StoreState = ProjSlice  & BearSlice

export const useStore = create<StoreState>()((...params) => ({
  ...createProjSlice(...params),
  ...createBearSlice(...params)
}))



