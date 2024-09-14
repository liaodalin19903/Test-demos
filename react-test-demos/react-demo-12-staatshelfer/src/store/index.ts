import { defineStore, type StaatShelferStore } from "staatshelfer";
import { create } from "zustand";

export interface Person {
  id: number,
  name: string, 
  age: number 
}

type Store = {
  userId: string | undefined;
  person: Person | null 
};

export const useMainStore = create<StaatShelferStore<Store>>((set) =>
  // throws an error if your definition for defaults don't match the Store type
  defineStore<Store>(set, {
    userId: undefined,
    person: null 
  }),

);

