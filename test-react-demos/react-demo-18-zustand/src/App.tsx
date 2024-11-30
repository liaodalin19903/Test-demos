import './App.css'

import { useCatStore } from './store/catStore' 

function App() {

  const { cats, addBigCats, addSmallCats } = useCatStore()

  return (
    <>
      
      <div>big cats: {cats.bigCats}</div>
      <div>small cats: {cats.smallCats}</div>

      <button onClick={addBigCats}>增加大猫</button>
      <button onClick={addSmallCats}>增加小猫</button>
    </>
  )
}

export default App
