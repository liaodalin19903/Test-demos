import * as z from 'zod';

import {initTRPC} from '@trpc/server';
// HACK: The `superjson` library is ESM-only (does not support CJS), while our codebase is CJS.
// This is a workaround to still get to use the latest version of the library from our codebase.
// https://github.com/blitz-js/superjson/issues/268
// https://www.npmjs.com/package/fix-esm
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const fixESM = require("fix-esm");
import type SuperJSON from "superjson";

import { wm } from '@main/wm'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const superjson: SuperJSON = fixESM.require("superjson");

const t = initTRPC.create({
  transformer: superjson
});

/**
 * 显示窗口
 */
export const winShow = t.procedure.input(z.object({
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
export const winHide = t.procedure.input(z.object({
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
export const publishEvent = t.procedure.input(z.object({
  winNames: z.array(z.string()),
  eventName: z.string(),
  data: z.unknown()
})).query(({input: {winNames, eventName, data}}) => {

  wm.publishEvent(winNames, eventName, data)

  return {
    msg: '发布事件成功'
  }
})
