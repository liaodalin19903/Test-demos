import { create, StateCreator } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware';

export interface BearSlice {
  bears: string[],
  addBear: () => void 
}

// export const createBearSlice: StateCreator<BearSlice> = (set, get) => ({
//   bears: [],
  
//   addBear: () => {
//     const { bears } = get()

//     const tmpProjs = bears 
//     tmpProjs.push('1') 

//     set({
//       bears: tmpProjs
//     })
//   }
// })



export const createBearSlice: StateCreator<BearSlice> = (set, get) => ({
  bears: [],
  addBear: () => {
    const { bears } = get();
    const tmpProjs = [...bears]; // 使用展开运算符创建一个新数组，避免直接修改状态
    tmpProjs.push('1'); 
    set({
      bears: tmpProjs
    });
  }
});