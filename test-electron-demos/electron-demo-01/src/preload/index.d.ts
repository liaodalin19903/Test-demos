import { ElectronAPI } from '@electron-toolkit/preload'

import {IElectronAPI, IpcRequest} from '../shared/@types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
