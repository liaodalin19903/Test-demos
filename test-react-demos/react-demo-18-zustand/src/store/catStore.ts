import { create } from "zustand"

export type TCatStoreState = {
  cats: {
    bigCats: number,
    smallCats: number 
  },
  addBigCats: () => void,
  addSmallCats: () => void  
}

export const useCatStore = create<TCatStoreState>()((set => ({
    cats: {
      bigCats: 0,
      smallCats: 0
    },
    addBigCats: () => {
      set((state) =>({
        cats: {
          ...state.cats,
          bigCats: state.cats.bigCats + 1
        }
      }))
    },
    addSmallCats: () => {
      set((state) => ({
        cats: {
          ...state.cats,
          smallCats: state.cats.smallCats + 1
        }
      }))
    }
  })
))

