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

import { WINDOW_EVENTS } from '@shared/constants'
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';

const ee = new EventEmitter();

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
 * 订阅事件: 这里是直接订阅（所有事件）
 */
export const winSubscription = t.procedure.subscription(() => {

  console.log('winSubscription: ')
  return observable((emit) => {
    function onObserve(text: string) {
      emit.next({text})
    }

    ee.on('winPublish', onObserve)

    return () => {
      ee.off('winPublish', onObserve)
    }
  })
})

/**
 * 发布事件
 */
export const winPublish = t.procedure.input(z.object({eventName: z.enum(WINDOW_EVENTS)})).query((req) => {
  const { input } = req
  ee.emit(input.eventName)

  return {
    text: `已经发布事件 ${input.eventName}`
  }
})
