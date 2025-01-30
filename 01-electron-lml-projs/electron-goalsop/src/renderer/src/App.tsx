
import Prepare from "./common/components/Prepare"

import Main from './layout/Main'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div style={{  }}>
        <Main></Main>
        <Prepare></Prepare>
      </div>
    </>
  )
}

export default App
