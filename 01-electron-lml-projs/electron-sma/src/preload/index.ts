import { electronAPI } from '@electron-toolkit/preload'
import {IElectronAPI, IpcRequest} from '@shared/@types'
import {contextBridge, ipcRenderer} from "electron";

import { Menu } from '@main/index';

//#region custom titlebar
import { Titlebar, TitlebarColor } from "custom-electron-titlebar"
import path from 'path';
import { MAIN_COLOUR } from '@shared/constants'

const menuItems = ([
  { label:'1' },
  { label:'2' },
  { label:'3' },
])

setTimeout(() => {
  console.log('imported status: ', Menu, ipcRenderer)
  }, 1000)

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
  const options = {
    // options
    backgroundColor: TitlebarColor.fromHex(MAIN_COLOUR),
    overflow: 'auto',
    icon: path.join(__dirname, '../../resources/icon.png'),
    tooltips: {
      minimize: 'Minimize',
      maximize: 'Maximize',
      restoreDown: 'Restore',
      close: 'Close'
    },
    shadow: false,
    onlyShowMenubar: true,
    //menu: Menu.buildFromTemplate(menuItems)
  };
  new Titlebar(options);
});
//#endregion

// Custom APIs for renderer
const api: IElectronAPI = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  trpc: (req: IpcRequest) => ipcRenderer.invoke('trpc', req),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
