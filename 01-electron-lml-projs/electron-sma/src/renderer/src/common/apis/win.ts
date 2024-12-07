import { apiTrpc as trpc } from './trpcClient/index'
import { WINDOW_EVENTS } from '@shared/constants'


// winShow
// winHide
// winSubscription
// winPublish


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

// TODO：订阅事件，看下是怎么做的
export const subscribeWindowEvent = () => {
  return trpc.winSubscription
}

export const publishWindowEvent = async(eventName: typeof WINDOW_EVENTS[number]) => {
  return await trpc.winPublish.query({eventName: eventName})
}
