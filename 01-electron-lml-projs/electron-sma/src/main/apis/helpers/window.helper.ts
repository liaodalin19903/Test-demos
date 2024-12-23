// 窗口的helpers

import { BrowserWindow } from "electron";
import type { WindowNameWithStates, WindowStatus, WindowWithStates } from "@shared/@types";
import { IMappedWindow, WindowsManager } from '@main/wm'

/**
 * 获取带有状态的窗口
 * @param win
 * @returns
 */
export const getWindowWithStatus = (win: BrowserWindow): WindowWithStates => {
  let status: WindowStatus = undefined

  if(!win.isVisible() && !win.isMinimized()) {
    status = 'Hidden'
  }else if(win.isMinimized()) {
    status = 'Minimized'
  }else if (win.isMaximized()) {
    status = 'Maximized'
  }
  else {
    status = 'VisibleNotMaximized'
  }

  return {
    win: win,
    status: status
  }
}

/**
 * 通过wm获取带状态的窗口
 * @param wm
 * @param winNames
 * @returns
 */
export const getWindowsWithStatusByWindowManager = (wm: WindowsManager, winNames?: string[]): WindowWithStates[] => {

  const winsWithStatus:WindowWithStates[] = []

  // 过滤出window
  const filteredMapWidows = winNames ? Object.entries(wm.mapWidows)
  .filter(([key]) => winNames.includes(key))
  .reduce((acc, [key, value]) => {
     acc[key] = value;
     return acc;
   }, {} as IMappedWindow) : wm.mapWidows

  Object.entries(filteredMapWidows).forEach(([key, win]) => {

    //console.log(`当前遍历到的窗口键为: ${key}`);
    const winWithStatus = getWindowWithStatus(win)
    winsWithStatus.push(winWithStatus)
  });

  return winsWithStatus
}

/**
 * 将 WindowWithStates[]  转为=> WindowNameWithStates[]
 * @param wm
 * @param winsWithStatus
 * @returns
 */
export const convertToWinNameStatus = (wm: WindowsManager, winsWithStatus: WindowWithStates[]): WindowNameWithStates[] => {
  return winsWithStatus.map(({ win, status }) => {
    // 假设可以通过WindowsManager的mapWidows属性找到对应的窗口名称
    const winName = Object.keys(wm.mapWidows).find(key => wm.mapWidows[key] === win) || '';
    return {
        winName,
        status
    };
  });
}

// 转为需要被设置为FooterButton状态的对象
export const converToShowStatesObject = (winNameWithStatuses: WindowNameWithStates[]): { [key: string]: boolean } => {
  const result: { [key: string]: boolean } = {};
  winNameWithStatuses.forEach(({ winName, status }) => {
    let resStatus: boolean = false
    if (status === 'VisibleNotMaximized' || status === "Maximized") {
      resStatus = true
    }
    result[winName] = resStatus;
  });
  return result;
};

