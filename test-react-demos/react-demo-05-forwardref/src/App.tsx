import {forwardRef, useImperativeHandle, useRef } from 'react';

import './App.css';

//#region 子组件定义
interface InputRef {
  focus: () => void;
  testConsole: () => void;
}

type InputCompProp = {
  placeholder: string 
}
 
const InputComp = forwardRef((props: InputCompProp, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
 
  // 使用 useImperativeHandle 自定义 ref 暴露的方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },

    testConsole: () => {
      console.log('子组件打印')
    }
  }));
 
  return <>
    <label>子组件</label>
    <br></br>
    <input ref={inputRef} {...props} />
  </>
});

//#endregion

const App = () => {
  const inputRef = useRef<InputRef>(null);

  const clickHandler = () => {
    if(inputRef.current) {
      inputRef.current.focus(); // 使用 forwardRef 暴露的 ref 方法
      inputRef.current.testConsole()
    }
  }
 
  return <>
    <label>父组件</label>
    <button onClick={clickHandler}>Focus Input</button>
    <br></br>
    <InputComp ref={inputRef} placeholder="Focus me" />;
  </>
};

export default App;
