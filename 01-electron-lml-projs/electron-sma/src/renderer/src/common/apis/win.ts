import { winSubscription } from './../../../../main/apis/win';

import { trpc } from './trpcClient/index'
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
export const subscribeWindowEvent = async() => {
  return await trpc.winSubscription.query()
}

export const publishWindowEvent = async() => {
  const user = await trpc.userCreate.mutate({
    name: 'New User',
    dateCreated: new Date()
  });

  return user
}
