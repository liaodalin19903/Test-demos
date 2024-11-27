import { useRef } from 'react'
import './App.css'
import HeadlessTabs from './components/headless-tabs'
import { Button } from 'antd'


interface HeadlessTabsRef {
  setActiveKey: (key: string) => void,
}

function App() {

  const headlessTabsRef = useRef<HeadlessTabsRef>(null)

  const headlessTabsProps = {
    tabPaneContents: ["Tab0内容", "Tab1内容", "Tab2内容"]
  }

  return (
    <>
      <HeadlessTabs 
        {...headlessTabsProps}
        ref={headlessTabsRef}
      ></HeadlessTabs>

      <Button onClick={() => {
        headlessTabsRef.current?.setActiveKey("0")
      }}>切换Tab0</Button>
      <Button onClick={() => {
        headlessTabsRef.current?.setActiveKey("1")
      }}>切换Tab1</Button>
      <Button onClick={() => {
        headlessTabsRef.current?.setActiveKey("2")
      }}>切换Tab2</Button>
    </>
  )
}

export default App
