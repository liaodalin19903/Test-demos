import { create } from 'zustand'


import { createTodoListSlice } from './todolist.store'
import { createBearSlice } from './bears.store'
import { createProjSlice } from './proj.store'

import { ProjSlice } from './proj.store'
import { createSMAModuleSlice, SMAModuleSlice } from './sma.store'
import { subscribeWithSelector } from 'zustand/middleware'


type StoreState = ProjSlice & SMAModuleSlice

export const useProjStore = create<ProjSlice>()(
  subscribeWithSelector(
    (...params) => ({
    ...createProjSlice(...params)
  })
  )
)

export const useSMAStore = create<SMAModuleSlice>()((...params) => ({
  ...createSMAModuleSlice(...params)
}))

