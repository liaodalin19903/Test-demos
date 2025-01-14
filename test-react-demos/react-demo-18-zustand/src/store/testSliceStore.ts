import { create, StateCreator } from "zustand";

export interface ASlice {
  aState: string,
  action1: () => void,
  action2: () => void 
}

export interface BSlice {
  bState: string,
  action1: () => void,
  action2: () => void 
}

export const createASlice: StateCreator<ASlice & BSlice, [], [], ASlice> = (set, get) => ({
  aState: 'a',
  action1: () => {

  },
  action2: () => {
    // get can obtain the variables or methods defined in this Slice
  }
});

export const createBSlice: StateCreator<ASlice & BSlice, [], [], BSlice> = (set, get) => ({
  bState: 'b',
  action1: () => {

  },
  action2: () => {
    // get can obtain the variables or methods defined in this Slice

    const { aState } = get()
    console.log(aState)
  }
});

// 创建 Zustand store
export const useStore = create<ASlice & BSlice>((...params) => ({
  ...createASlice(...params),
  ...createBSlice(...params)
}));