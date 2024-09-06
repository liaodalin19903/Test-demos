
//#region 1、test
import { testHandlers } from './test/test.handlers'
import { configHandlers } from './config/config.handlers'

//#endregion

export const registerIpcMainHandlers = (): void => {
  //#region 1、test
  // test handlers
  testHandlers()

  configHandlers()
  //#endregion
}
