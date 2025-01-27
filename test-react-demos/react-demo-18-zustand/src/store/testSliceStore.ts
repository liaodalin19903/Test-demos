import { create, StateCreator } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface ASlice {
  aState: string,
  aStateEqualsToA: () => boolean,
  aAction1: () => void,
  aAction2: () => void 
}

export interface BSlice {
  bState: string,
  bAction1: () => void,
  bAction2: () => void 
}

export const createASlice: StateCreator<ASlice & BSlice, [], [["zustand/subscribeWithSelector", never]], ASlice> = (set, get) => ({
  aState: '0',
  aStateEqualsToA: () => {
    return get().aState === 'a'
  },
  aAction1: () => {
    set({ aState: 'a' })
  },
  aAction2: () => {
    // get can obtain the variables or methods defined in this Slice
    set({ aState: 'b' })
  }
});

export const createBSlice: StateCreator<ASlice & BSlice, [], [["zustand/subscribeWithSelector", never]], BSlice> = (set, get) => ({
  bState: 'b',
  bAction1: () => {

  },
  bAction2: () => {
    // get can obtain the variables or methods defined in this Slice

    const { aState } = get()
    console.log(aState)
  }
});

// Zustand store
export const useStore = create<ASlice & BSlice>()(subscribeWithSelector((...params) => ({
  ...createASlice(...params),
  ...createBSlice(...params)
})));

useStore.subscribe(
  state => state.aStateEqualsToA,
  (aStateEqualsToA, prevAStateEqualsToA) => {
    console.log('lml: ', aStateEqualsToA, prevAStateEqualsToA)
  }
)