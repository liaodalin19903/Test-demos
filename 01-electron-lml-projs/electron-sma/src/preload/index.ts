import { electronAPI } from '@electron-toolkit/preload'
import {IElectronAPI, IpcRequest} from '@shared/@types'
import {contextBridge, ipcRenderer} from "electron";
import { exposeElectronTRPC } from 'electron-trpc/main';

// Custom APIs for renderer
const api: IElectronAPI = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  trpc: (req: IpcRequest) => ipcRenderer.invoke('trpc', req),
  onEvent: (eventName: string, callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(eventName, callback),
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

  window.electron = electronAPI
  window.api = api
}

process.once('loaded', async () => {
  exposeElectronTRPC();
});
