import { create } from 'zustand'


import { createTodoListSlice } from './todolist.store'
import { createBearSlice } from './bears.store'
import { createProjSlice } from './proj.store'

import { ProjSlice } from './proj.store'
import { createSMAModuleSlice, SMAModuleSlice } from './sma.store'

type StoreState = ProjSlice  & SMAModuleSlice

export const useStore = create<StoreState>()((...params) => ({
  ...createProjSlice(...params),
  ...createSMAModuleSlice(...params)
}))

