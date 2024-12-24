// 主进程 -> 渲染进程: 发送事件

import { BrowserWindow } from 'electron';


/**
 * 通过ipc：主进程发送事件给渲染进程
 * @param win
 * @param channel
 * @param data
 */
export const mainToRenderer = (win: BrowserWindow, channel: string, data: Object) => {
  win.webContents.send(channel, data)
}
