import { ipcMain } from 'electron'
//import { IpcMainEvent } from 'electron'

import OSService from '../../db/service/config.service'

export const osHandlers = (): void => {
  ipcMain.on('os:config', (event, data) => {
    console.log(event)
    return OSService.getConfig(data.id)
  })
}
