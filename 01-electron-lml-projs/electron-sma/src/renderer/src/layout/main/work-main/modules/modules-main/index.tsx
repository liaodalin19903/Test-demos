// 封装一个Graphin图

import { GraphData } from '@antv/g6';
import { Graphin } from '@antv/graphin';


import React, { useEffect, useState } from 'react'
import { useFetchModulesWithCodefuncsAndEdgesData } from './hooks/useFetchModulesWithCodefuncsAndEdgesData';
import { useProjStore, useSMAStore } from '@renderer/common/store';
import { DataConverter } from '@renderer/common/helpers/DataConverter'


export default function ModulesMain() {

  const { modulesWithCodefuncsAndEdges } = useSMAStore()
  useFetchModulesWithCodefuncsAndEdgesData()

  const [data, setData] = useState<GraphData>()

  useEffect(() => {
    // 准备数据
    console.log('组件: ', modulesWithCodefuncsAndEdges)

    if(modulesWithCodefuncsAndEdges) {
      const data = DataConverter.transformData('SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData', modulesWithCodefuncsAndEdges)
      setData(data)
    }

  }, [modulesWithCodefuncsAndEdges])


  return (
    <div>ModulesMain</div>
  )
}


