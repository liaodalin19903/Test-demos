
import { useEffect } from 'react'
import './App.css'

import { usePouchDB } from './hooks/usePouchDB';


function App() {

  const {
    localDB, remoteDB
  } = usePouchDB()

  useEffect(() => {

    console.log(localDB.adapter, remoteDB.adapter)

  }, [localDB, remoteDB])

  return (
    <>
      112233
    </>
  )
}

export default App
