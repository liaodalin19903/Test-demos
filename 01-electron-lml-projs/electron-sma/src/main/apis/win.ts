import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'
import { wm } from '@main/wm'


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

  wm.hiddeWindow(windowName)

  return {
    msg: '隐藏窗口成功'
  }
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
