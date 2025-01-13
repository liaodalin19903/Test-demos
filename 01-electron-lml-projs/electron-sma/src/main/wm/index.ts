import { BrowserWindow } from "electron"

import { win1Options, win2Options, win3Options } from  './winOpt'

import { join } from "path"
import { is } from "@electron-toolkit/utils"
import { EVENTS, WINDOW_NAMES } from "@shared/constants"

import { mainToRenderer } from '@main/apis/apisForMain'

export interface IMappedWindow {
  [key: string] : BrowserWindow
}

export class WindowsManager {

  private static instance: WindowsManager
  mainWindow: BrowserWindow | undefined
  mapWidows: IMappedWindow  // 除了mainWindow之外的window

  constructor() {
    this.mapWidows = {}
  }

  static getInstance() {
    if (!WindowsManager.instance) {
      WindowsManager.instance = new WindowsManager();
      WindowsManager.instance.mapWidows = {}
    }
    return WindowsManager.instance;
  }

  //#region 1、窗口管理

  //#region 初始化窗口

  // 初始化Window：创建所有的为了要展示的窗口
  initWindows(mainWindow: BrowserWindow) {

    this.mainWindow = mainWindow

    // Create the browser window.
    const win1 = this.createWindow(WINDOW_NAMES.WIN1, win1Options)

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win1.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#win1')
    } else {
      win1.loadFile(join(__dirname, '../renderer/index.html#win1'))
    }

    win1.on('close', function(e) {
      if (!global.isAppQuitting) {
        e.preventDefault();
        win1.hide()

        // 发起事件：更新按钮状态
        mainToRenderer(mainWindow, EVENTS.EVENT_FOOTERBUTTON_UPDATE_STATUS, {
          fromWindow: WINDOW_NAMES.WIN1
        })
      }
    })

    // Create the browser window.

    const win2 = this.createWindow(WINDOW_NAMES.WIN2, win2Options)

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win2.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#win2')
    } else {
      win2.loadFile(join(__dirname, '../renderer/index.html#win2'))
    }

    win2.on('close', function(e) {
      if (!global.isAppQuitting) {
        e.preventDefault();
        win2.hide()
        // 发起事件：更新按钮状态
        mainToRenderer(mainWindow, EVENTS.EVENT_FOOTERBUTTON_UPDATE_STATUS, {
          fromWindow: WINDOW_NAMES.WIN2
        })
      }
    })

    // Create the browser window.

    const win3 = this.createWindow(WINDOW_NAMES.WIN3, win3Options)

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win3.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#win3')
    } else {
      win3.loadFile(join(__dirname, '../renderer/index.html#win3'))
    }

    win3.on('close', function(e) {
      if (!global.isAppQuitting) {
        e.preventDefault();
        win3.hide()
        // 发起事件：更新按钮状态
        mainToRenderer(mainWindow, EVENTS.EVENT_FOOTERBUTTON_UPDATE_STATUS, {
          fromWindow: WINDOW_NAMES.WIN3
        })
      }
    })

  }



  //#endregion 初始化窗口

  /**
   * 创建一个新的窗口
   * @param windowName - 窗口的名称
   * @throws {Error} 如果窗口名称已经存在，则抛出错误
   */
  createWindow(windowName: string, options: Electron.BrowserWindowConstructorOptions) {
    // 检查窗口名称是否已经存在
    if (this.mapWidows[windowName]) {
      // 如果窗口名称已经存在，抛出一个错误
      throw new Error(`Window with name ${windowName} already exists.`);
    }

    // 创建一个新的 BrowserWindow 实例
    const bw = new BrowserWindow(options);
    // 将新创建的窗口实例添加到 mapWidows 中
    this.mapWidows[windowName] = bw;
    return bw
  }



  showWindow(windowName: string) {
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，返回对应的窗口实例
      this.mapWidows[windowName].show();
    } else {
      // 如果窗口名称不存在，返回 null
    }
  }

  hideWindow(windowName: string) {
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，返回对应的窗口实例
      this.mapWidows[windowName].hide();
    } else {
      // 如果窗口名称不存在，返回 null
    }
  }

  /**
   * 获取指定名称的窗口
   * @param windowName - 窗口的名称
   * @returns {BrowserWindow|null} - 窗口实例或 null
   */
  getWindow(windowName: string): BrowserWindow | null {
    // 检查窗口名称是否存在
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，返回对应的窗口实例
      return this.mapWidows[windowName];
    } else {
      // 如果窗口名称不存在，返回 null
      return null;
    }
  }

  /**
   * 关闭指定名称的窗口
   * @param windowName - 窗口的名称
   * @throws {Error} 如果窗口名称不存在，则抛出错误
   */
  closeWindow(windowName: string) {
    // 检查窗口名称是否存在
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，关闭对应的窗口实例
      this.mapWidows[windowName].close();
      // 从 mapWidows 中删除对应的窗口实例
      delete this.mapWidows[windowName];
    } else {
      // 如果窗口名称不存在，抛出一个错误
      throw new Error(`Window with name ${windowName} does not exist.`);
    }
  }

  /**
   * 关闭所有窗口
   */
  closeAllWindows() {
    // 遍历 mapWidows 中的所有窗口实例
    for (const windowName in this.mapWidows) {
      // 关闭每个窗口实例
      this.mapWidows[windowName].close();
    }
    // 清空 mapWidows
    this.mapWidows = {};
  }

  /**
   * 获取所有窗口的名称
   * @returns {string[]} - 窗口名称数组
   */
  getAllWindowNames(): string[] {
    // 遍历 mapWidows 中的所有窗口实例
    return Object.keys(this.mapWidows);
  }

  getAllWindows() {

    Object.entries(this.mapWidows).forEach(([key, win]) => {
      console.log(`当前遍历到的窗口键为: ${key}`);
      console.log(`窗口是否可见: ${win.isVisible()}`);
    });


  }

  /**
   * 最小化指定名称的窗口
   * @param windowName - 窗口的名称
   * @throws {Error} 如果窗口名称不存在，则抛出错误
   */
  minimizeWindow(windowName: string) {
    // 检查窗口名称是否存在
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，最小化对应的窗口实例
      this.mapWidows[windowName].minimize();
    } else {
      // 如果窗口名称不存在，抛出一个错误
      throw new Error(`Window with name ${windowName} does not exist.`);
    }
  }

  /**
   * 最大化指定名称的窗口
   * @param windowName - 窗口的名称
   * @throws {Error} 如果窗口名称不存在，则抛出错误
   */
  maximizeWindow(windowName: string) {
    // 检查窗口名称是否存在
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，最大化对应的窗口实例
      this.mapWidows[windowName].maximize();
    } else {
      // 如果窗口名称不存在，抛出一个错误
      throw new Error(`Window with name ${windowName} does not exist.`);
    }
  }

  /**
   * 取消最大化指定名称的窗口
   * @param windowName - 窗口的名称
   * @throws {Error} 如果窗口名称不存在，则抛出错误
   */
  unmaximizeWindow(windowName: string) {
    // 检查窗口名称是否存在
    if (this.mapWidows[windowName]) {
      // 如果窗口名称存在，取消最大化对应的窗口实例
      this.mapWidows[windowName].unmaximize();
    } else {
      // 如果窗口名称不存在，抛出一个错误
      throw new Error(`Window with name ${windowName} does not exist.`);
    }
  }

  //#endregion 窗口管理

  //#region 2、事件共享 ： 我：在window的tsx初始化生命周期时候实现订阅事件
  /**
   * 发送事件
   * @param winNames 给这么多窗口发送事件
   * @param eventName 也就是webContents.send(channel, ...args) 里面的channel
   * @param data 也就是webContents.send(channel, ...args) 里面的 args
   */
  publishEvent(winNames: string[], eventName: string, data: unknown) {
    for (const winName of winNames) {
      console.log('发送事件：', winName, wm.getWindow(winName))
      wm.getWindow(winName)?.webContents.send(eventName, data)
    }
  }
  //#endregion 事件共享


  //#region 3、数据共享：基于db实现

  //#endregion 数据共享

}

const wm = WindowsManager.getInstance()

export {wm}
