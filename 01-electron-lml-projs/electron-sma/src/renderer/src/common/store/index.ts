import { create } from 'zustand'


import { createTodoListSlice } from './todolist.store'
import { createBearSlice } from './bears.store'


// 全局状态
export const useStore = create((set:any, get:any) => ({
  ...createBearSlice(set, get),
  ...createTodoListSlice(set, get)
}))
