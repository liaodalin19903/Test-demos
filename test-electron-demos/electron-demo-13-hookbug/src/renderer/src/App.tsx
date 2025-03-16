import { useEffect } from "react"
import { usePrepareData } from "./hooks/usePrepareData"

function App(): JSX.Element {
  const data: string[]  = usePrepareData()  // 1、先执行hooks里面的useEffect

  useEffect(() => {
    console.log('exe: App.ts')  // 2、再执行组件里面的useEffectpnpm add -D vitest @vitest/runner @vitest/ui jsdompnpm add -D vitest @vitest/runner @vitest/ui jsdom
  }, [])

  return (
    <>
      <button onClick={
       () => {
        console.log(data)
       }
      }>点击打印数据</button>
    </>
  )
}

export default App
