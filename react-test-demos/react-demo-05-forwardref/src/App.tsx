import React, { forwardRef, LegacyRef, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

//#region 子组件定义
const ChildComp = forwardRef(( props, ref: LegacyRef<HTMLInputElement> ) => {

  return <input value="我是子组件的input" ref={ref} />
})
//#endregion

function App() {

  const inpRef = useRef(null)

  const focusFn = () => {
    console.log(inpRef.current)
  }

  return (
    <div className="App">
      <ChildComp ref={inpRef} />

      <button onClick={focusFn}>点击打印当前inpuRef</button>
    </div>
  );
}

export default App;
