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

export const publishEvent = async(winNames: string[], eventName: string, data: unknown) => {
  return await trpc.publishEvent.query({
    winNames: winNames,
    eventName: eventName,
    data: data
  })
}
