import { ipcMain } from 'electron'
//import { IpcMainEvent } from 'electron'

import { container } from '../../ioc/ioc-container'
import { IConfig } from '../../db/interfaces/interfaces'

const ConfigService = container.get<IConfig>(IConfig)

export const configHandlers = (): void => {
  ipcMain.on('os:config', (event, data) => {
    console.log(event)
    return ConfigService.getConfig(data.id)
  })
}
