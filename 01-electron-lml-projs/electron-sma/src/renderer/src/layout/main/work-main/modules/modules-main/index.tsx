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
    //console.log('组件: ', modulesWithCodefuncsAndEdges)

    if(modulesWithCodefuncsAndEdges) {
      const data = DataConverter.transformData('SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData', modulesWithCodefuncsAndEdges)
      console.log('转换后的data：', data)
      setData(data)
    }

  }, [modulesWithCodefuncsAndEdges])


  return (
    <>
      <Graphin
        id="my-graphin-demo"
        className="my-graphin-container"
        style={{ backgroundColor: 'white' }}
        options={{
          data,
          node: {
            style: {
              size: 10,
              labelText: (node) => node.data!.codefuncName as string,
              ports: [],
            },
          },
          edge: {
            style: {
              stroke: '#7EC0FC',
              endArrow: true
            }
          },
          combo: {
            type: 'rect'
          },
          layout: {
            type: 'combo-combined',
            comboPadding: 2,
          },
          behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element', 'click-select'],
          plugins: [{ key: 'grid-line', type: 'grid-line', follow: false }],
        }}
      >
      </Graphin>
    </>
  )
}


