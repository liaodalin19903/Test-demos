import { BrowserWindow } from "electron"

/**
 * 窗口的状态
 *
 */
export type WindowStatus = 'Minimized' | 'Maximized' | 'Hidden' | 'VisibleNotMaximized' | undefined


// 带有状态的窗口信息
export interface WindowWithStates {
  win: BrowserWindow,
  status: WindowStatus
}

export interface WindowNameWithStates {
  winName: string,
  status: WindowStatus
}
