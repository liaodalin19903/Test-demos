import { useStore } from '@renderer/common/store'

import Layout from '@renderer/layout'
import { useEffect } from 'react'

function App(): JSX.Element {

  //#region 初始化操作
  const { fetchProjs, fetchModulesWithCodefuncs, selectedProjMod } = useStore()

  const initStore = async () => {
    await fetchProjs()
    if(selectedProjMod) {
      await fetchModulesWithCodefuncs(selectedProjMod.id!)
    }
  }

  useEffect(() => {

    const asyncFunc = async() => {
      // 初始化store
      await initStore()
    }
    asyncFunc()



  }, [])

  //#endregion

  return (
    <div>
      <Layout/>
    </div>
  )
}

export default App
