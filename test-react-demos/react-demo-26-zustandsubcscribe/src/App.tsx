import { useEffect } from 'react'
import './App.css'

import { useBearWithSubStore } from './common/store'

function App() {

  const { bears, addBear } = useBearWithSubStore()

  useEffect(() => {

    const unsub = useBearWithSubStore.subscribe(
      state=>state.bears,
      (bears, prevBears) => {
        console.log(bears, prevBears)
      }
    )

    return unsub
  }, [])

  const handleClick = () => {
    console.log(123)
    addBear()
    console.log(bears)
  }  

  return (
    <>
      112233

      <button onClick={handleClick}>点击</button>
    </>
  )
}

export default App
