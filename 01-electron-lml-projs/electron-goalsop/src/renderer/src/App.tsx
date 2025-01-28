
import Prepare from "./components/Prepare"

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>

      <Prepare></Prepare>
    </>
  )
}

export default App
