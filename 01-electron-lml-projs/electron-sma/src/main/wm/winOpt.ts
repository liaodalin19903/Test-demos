// 创建windows 需要的options参数

import { TITLEBAR_HEIGHT } from "@shared/constants";
import { join } from "path";


export const win1Options = {
  title: 'win1',
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
  title: 'win2',
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
  title: 'win3',
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
