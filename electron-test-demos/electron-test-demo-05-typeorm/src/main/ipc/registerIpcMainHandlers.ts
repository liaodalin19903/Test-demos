
//#region 1、test
import { testHandlers } from './test/test.handlers'
import { osHandlers } from './os/config.handlers'

//#endregion

export const registerIpcMainHandlers = (): void => {
  //#region 1、test
  // test handlers
  testHandlers()

  osHandlers()
  //#endregion
}
