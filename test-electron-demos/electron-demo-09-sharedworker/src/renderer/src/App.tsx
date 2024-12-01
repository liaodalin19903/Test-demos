const remote = require('remote')

const windowManager = remote.require('electron-window-manager')

function App(): JSX.Element {

  return (
    <>
     112233
      <button
        onClick={() => {
          console.log(windowManager)
        }}
      >
        点击打印
      </button>
    </>
  )
}

export default App
