import './App.css'

import { useBearStore } from './store/bearStore' 

function App() {

  const { bears, increasePopulation, removeAllBears } = useBearStore()

  return (
    <>
      
      <label>bears: {bears}</label>

      <button onClick={increasePopulation}>增加</button>
      <button onClick={removeAllBears}>reset</button>
    </>
  )
}

export default App
