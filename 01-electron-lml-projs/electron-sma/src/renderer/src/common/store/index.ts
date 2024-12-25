import { create } from 'zustand'


import { createTodoListSlice } from './todolist.store'
import { createBearSlice } from './bears.store'
import { createProjSlice } from './proj.store'

import { ProjSlice } from './proj.store'

type StoreState = ProjSlice // & OtherSlice

export const useStore = create<StoreState>()((...params) => ({
  ...createProjSlice(...params)
  // ...createOtherSlice(...params)
}))

