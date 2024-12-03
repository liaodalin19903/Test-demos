export const createBearSlice = (set:any, get:any) => ({

  // 1.状态
  bears: 0,

  // 2.操作状态的actions
  increasePopulation: () => set((state:any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

})
