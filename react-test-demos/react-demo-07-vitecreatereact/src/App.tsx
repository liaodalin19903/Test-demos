import { forwardRef, createRef, useImperativeHandle } from 'react'
import './App.css'

//#region 子组件

const ChildComp = forwardRef((props, ref) => {

    const childRef = createRef<HTMLInputElement>() 

    useImperativeHandle(ref, () => ({
      childFocusFn: () => {
        childRef.current?.focus()
        console.log("childFocusFn called.")
      }
    }))

    return <>
      <input defaultValue="我是子组件" type='text' ref={childRef}></input>
    </>
  }
)

//#endregion

function App() {
  const ref = createRef<{ childFocusFn: () => void }>()

  const clickFn = () => {
    if(ref.current) {
      ref.current.childFocusFn()
    }
  }

  return (
    <>
     <ChildComp ref={ref}></ChildComp>

     <button onClick={clickFn}>点击调用子组件方法</button>
    </>
  )
}

export default App
