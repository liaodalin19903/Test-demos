
import { useEffect } from 'react';
import './App.css'

import { useMainStore } from './store';
import { selectFromStore } from "staatshelfer";

import { initStates } from './store'


function App() {

  const { 
    userId, setUserId,
    stateA, setStateA,
    stateB 
  } = selectFromStore(
    useMainStore,
    ["userId", "stateA", "stateB"]
  )

  useEffect(() => {
    initStates({
      setUserId,
      setStateA
    })
  }, [setStateA, setUserId])


  return (
    <>
      <div>userId = {userId}</div>
      <div>stateA = {stateA}</div>
      <div>stateB = {stateB}</div>
    </>
  )
}

export default App
