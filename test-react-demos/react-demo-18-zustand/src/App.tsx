
import './App.css'

import { useStore } from './store/testSliceStore' 

function App() {

  const { 
    aStateEqualsToA, 
    aAction1,  // 设置为a
    aAction2   // 设置为b
  } = useStore()

  return (
    <>
      { aStateEqualsToA() ? 'a=a' : 'a!=a' }

      <div>
      <button onClick={aAction1}>设置为a</button>
      <button onClick={aAction2}>设置为b</button>
      </div>
    </>
  )
}

export default App
