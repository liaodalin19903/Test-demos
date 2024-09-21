import React from "react"
import { useEffect } from "react"

import {subscribableLikeToObservable} from "electron-rpc-api";

import { useMainStore, initStates } from './store';
import { selectFromStore } from "staatshelfer";



import { ConfigEntities } from "@shared/db-entities/Config";

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

const ipcMainTestDbMethod = ipcMainApiClient('testInsertDb')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = () => {

  const {
    userId, setUserId,
    stateA, setStateA,
    stateB
  } = selectFromStore(useMainStore, [
    'userId', 'stateA', 'stateB'
  ])

  const ipcHandle = async () => {
    console.log('clicked')
    const entity = new ConfigEntities(
      'en-US',
      'light',
      ''
    )
    const res: ConfigEntities = await ipcMainTestDbMethod(entity);
    console.log("res: ", res)
  }

  const storeHandle = () => {
    // 初始化store数据
    initStates({
      setUserId,
      setStateA
    })
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
      <br></br>
      <button
        onClick={() => {
          storeHandle()
        }}
      >
        点击初始化store数据
      </button>

      <div>userId: {userId}</div>
      <div>stateA: {stateA}</div>
      <div>stateB: {stateB}</div>
    </>
  )
}

export default App
