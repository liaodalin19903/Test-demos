
import { useEffect } from 'react';
import './App.css'

import { useMainStore } from './store';
import { selectFromStore } from "staatshelfer";

import { Person } from './store'

function App() {

  const { userId, setUserId, resetUserId } = selectFromStore(
    useMainStore,
    ["userId"]
  )

  const { person, setPerson } = selectFromStore(
    useMainStore,
    ["person"]
  )

  useEffect(() => {
    console.log(userId)
    console.log(person)
  },[person, userId])

  return (
    <>
      <button onClick={() => {
        
        /*
        if(userId) {
          resetUserId()
        }else{
          setUserId("333")
        }*/

        const p: Person = {
          id: 1,
          name: '小明',
          age: 23
        }

        setPerson(p)
        
      }}>更新ID</button>
    </>
  )
}

export default App
