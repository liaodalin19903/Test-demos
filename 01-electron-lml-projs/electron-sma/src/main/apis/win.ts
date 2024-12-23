import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'
import { wm } from '@main/wm'
import { WindowWithStates } from '@shared/@types'
import { converToShowStatesObject, convertToWinNameStatus, getWindowsWithStatusByWindowManager } from './helpers/window.helper'


/**
 * 显示窗口
 */
export const winShow = publicProcedure.input(z.object({
  windowName: z.string()
})).query(({input: {windowName}}) => {

  wm.showWindow(windowName)

  return {
    msg: '显示窗口成功'
  }
})

/**
 * 关闭窗口
 */
export const winHide = publicProcedure.input(z.object({
  windowName: z.string()
})).query(({input: {windowName}}) => {

  wm.hideWindow(windowName)

  return {
    msg: '隐藏窗口成功'
  }
})

/**
 * 获取带有状态的窗口
 */
export const winsWithStatus = publicProcedure.input(
  z.object({
    winNames: z.array(z.string()).optional(),   // 窗口名称列表
  })
).query(({input: {winNames}}) => {

  console.log('main:getAllWindows: ', winNames)

  const winsWithStatus: WindowWithStates[] = getWindowsWithStatusByWindowManager(wm, winNames ? winNames: undefined)

  return winsWithStatus
})


/**
 * 获取所有：窗口名称+状态
 * eg. {
 *   'WIN1': true,
 *   'WIN2': false,
 *   'WIN3': false
 * }
 */
export const getAllWinNameStatus = publicProcedure.input(z.object({})).query(({input: {}}) => {
  const windowsWithStatus = getWindowsWithStatusByWindowManager(wm)
  const winNameWithStatus = convertToWinNameStatus(wm, windowsWithStatus)
  const allWinNameStatus = converToShowStatesObject(winNameWithStatus)

  return allWinNameStatus
})

/**
 * 触发事件
 */
export const publishEvent = publicProcedure.input(z.object({
  winNames: z.array(z.string()),
  eventName: z.string(),
  data: z.unknown()
})).query(({input: {winNames, eventName, data}}) => {

  wm.publishEvent(winNames, eventName, data)

  return {
    msg: '发布事件成功'
  }
})


