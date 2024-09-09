import React from "react"
import { useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = () => {
  //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const ipcHandle = (): void => {
    window.IPC.invoke('ping')
  }

  // useEffect(() => {
  //   // 这里是需要在 electron 中 preload 中设置 contextBridge
  //   window.IPC.sendSync('os:config', 1)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, [])

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
