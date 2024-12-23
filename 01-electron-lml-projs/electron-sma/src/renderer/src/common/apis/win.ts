import { trpc } from './trpcClient/index'

export const showWindow = async(windowName: string) => {
  return await trpc.winShow.query({
    windowName: windowName
  })
}

export const hideWindow = async(windowName: string) => {
  return await trpc.winHide.query({
    windowName: windowName
  })
}

// 获取带有状态的窗口们
export const getWindowsWithStatus = async() => {
  return await trpc.winsWithStatus.query({
  })
}

// 获取直接用于state对象的设置数据.
// 参考：src/renderer/src/layout/footer/footer.tsx 里面的showWinStates
export const getAllWinNameStatus = async() => {
  return await trpc.getAllWinNameStatus.query({})
}


export const publishEvent = async(winNames: string[], eventName: string, data: unknown) => {
  return await trpc.publishEvent.query({
    winNames: winNames,
    eventName: eventName,
    data: data
  })
}
