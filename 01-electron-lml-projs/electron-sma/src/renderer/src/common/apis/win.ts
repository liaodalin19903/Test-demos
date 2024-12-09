import { apiTrpc } from './trpcClient/index'
import { WINDOW_EVENTS } from '@shared/constants'


// winShow
// winHide
// winSubscription
// winPublish


export const showWindow = async(windowName: string) => {
  return await apiTrpc.winShow.query({
    windowName: windowName
  })
}

export const hideWindow = async(windowName: string) => {
  return await apiTrpc.winHide.query({
    windowName: windowName
  })
}

// TODO：订阅事件，看下是怎么做的
export const subscribeWindowEvent = () => {
  return apiTrpc.winSubscription
}

export const publishWindowEvent = async(eventName: typeof WINDOW_EVENTS[number]) => {
  return await apiTrpc.winPublish.query({eventName: eventName})
}
