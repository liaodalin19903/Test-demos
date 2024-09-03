import { ElectronAPI } from '@electron-toolkit/preload'
import { IpcRendererEvent } from 'electron'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    IPC: {
      invoke: (channel: string, data: unknown[]) => Promise<unknown>
      ipcOn: (
        channel: string,
        fun: (event: IpcRendererEvent, data: unknown[]) => void
      ) => Electron.IpcRenderer
      removeAllListeners: (channel: string) => Electron.IpcRenderer
    }
  }
}
