// 创建windows 需要的options参数

import { TITLEBAR_HEIGHT, WINDOW_NAMES } from "@shared/constants";
import { join } from "path";


export const win1Options = {
  title: WINDOW_NAMES.WIN1,
  width: 720,
  height: 520,
  show: false,
  autoHideMenuBar: true,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false
  },
  //#region titlebar的状态
  titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: TITLEBAR_HEIGHT
  }
//#endregion
}


export const win2Options = {
  title: WINDOW_NAMES.WIN2,
  width: 720,
  height: 520,
  show: false,
  autoHideMenuBar: true,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false
  },
  titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: TITLEBAR_HEIGHT
  }
}


export const win3Options = {
  title: WINDOW_NAMES.WIN3,
  width: 720,
  height: 520,
  show: false,
  autoHideMenuBar: true,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false
  },
  titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: TITLEBAR_HEIGHT
  }
}
