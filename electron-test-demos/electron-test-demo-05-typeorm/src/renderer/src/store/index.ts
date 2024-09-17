import { defineStore, type StaatShelferStore } from "staatshelfer";
import { create } from "zustand";
import { initStates } from './initialState'

export type Store = {
  userId: string | undefined,
  stateA: string | undefined,
  stateB: number | undefined
};

const useMainStore = create<StaatShelferStore<Store>>((set) =>
  // throws an error if your definition for defaults don't match the Store type
  defineStore<Store>(set, {
    userId: undefined,
    stateA: undefined,
    stateB: undefined
  }),
);


export { useMainStore, initStates }
