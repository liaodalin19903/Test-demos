import React from "react"
import { useEffect } from "react"

import {subscribableLikeToObservable} from "electron-rpc-api";

// the below code block is recommended for adding if you create/destroy
// the renderer processes dynamically (multiple times)
const cleanupPromise = new Promise<void>((resolve) => {
  // don't call ".destroy()" on the BrowserWindow instance in the main process but ".close()"
  // since the app needs "window.beforeunload" event handler to be triggered
  window.addEventListener("beforeunload", () => resolve());
});

const ipcMainApiClient = __ELECTRON_EXPOSURE__.buildIpcMainClient({
  // the below code line is recommended for adding if you create/destroy
  // the renderer processes dynamically (multiple times)
  options: {finishPromise: cleanupPromise},
});

// resolved methods
//const ipcMainPingMethod = ipcMainApiClient("ping"); // type-safe API method resolving

const ipcMainTestMethod = ipcMainApiClient("test")

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = () => {
  //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const ipcHandle = async () => {
    console.log('clicked')
    const res = await ipcMainTestMethod();
    console.log("res: ", res)
  }

  return (
    <>
      <button
        onClick={() => {
          ipcHandle()
        }}
      >
        点击调用ipc
      </button>
    </>
  )
}

export default App
