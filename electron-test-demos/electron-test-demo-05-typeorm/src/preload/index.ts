import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('IPC', {
      invoke: (channel: string, data: unknown[]): Promise<unknown> => {
        return ipcRenderer.invoke(channel, data)
      },
      ipcOn: (
        channel: string,
        fun: (event: IpcRendererEvent, data: unknown[]) => void
      ): Electron.IpcRenderer => {
        const subscription = (event: IpcRendererEvent, data: unknown[]): void => fun(event, data)
        return ipcRenderer.on(channel, subscription)
      },
      removeAllListeners: (channel: string): Electron.IpcRenderer => {
        return ipcRenderer.removeAllListeners(channel)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.IPC = {
    invoke: (channel: string, data: unknown[]): Promise<unknown> => {
      return ipcRenderer.invoke(channel, data)
    },
    ipcOn: (
      channel: string,
      fun: (event: IpcRendererEvent, data: unknown[]) => void
    ): Electron.IpcRenderer => {
      const subscription = (event: IpcRendererEvent, data: unknown[]): void => fun(event, data)
      return ipcRenderer.on(channel, subscription)
    },
    removeAllListeners: (channel: string): Electron.IpcRenderer => {
      return ipcRenderer.removeAllListeners(channel)
    }
  }
}
