// 封装一个Graphin图

import { Graph, GraphData, IPointerEvent, NodeEvent } from '@antv/g6';
import { Graphin } from '@antv/graphin';


import React, { createRef, useEffect, useRef, useState } from 'react'
import { useFetchModulesWithCodefuncsAndEdgesData } from './hooks/useFetchModulesWithCodefuncsAndEdgesData';
import { useProjStore, useSMAModulesStore } from '@renderer/common/store';
import { DataConverter } from '@renderer/common/helpers/DataConverter'


export default function ModulesMain() {

  const {
    modulesWithCodefuncsAndEdges,
    plugins,
    setSelectedSMAModulesGraphCombos,  // 选择模块
    setSelectedSMAModulesGraphNodes
  } = useSMAModulesStore()
  useFetchModulesWithCodefuncsAndEdgesData()

  const [data, setData] = useState<GraphData>()

  const graphRef = createRef();


  useEffect(() => {
    // 准备数据
    //console.log('组件: ', modulesWithCodefuncsAndEdges)

    if(modulesWithCodefuncsAndEdges) {
      //console.log('转换前的data：', modulesWithCodefuncsAndEdges)
      const data = DataConverter.transformData('SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData', modulesWithCodefuncsAndEdges)
      //console.log('转换后的data：', data)
      setData(data)
    }

  }, [modulesWithCodefuncsAndEdges])

  // 点击G6元素
  const handleClickElement = (e: IPointerEvent) => {
    const graph = graphRef.current as Graph
    //console.log('graph-selected-node: ', graph.getElementDataByState('node', 'selected'))
    //console.log('graph-selected-comobo: ', graph.getElementDataByState('combo', 'selected'))

    const selectedNodes = graph.getElementDataByState('node', 'selected')
    const selectedCombo = graph.getElementDataByState('combo', 'selected')

    setSelectedSMAModulesGraphNodes(selectedNodes)
    setSelectedSMAModulesGraphCombos(selectedCombo)

  }

  return (
    <>
      <Graphin
        ref={graphRef}
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
            //type: 'rect',
            style: {
              padding: 20,
              fill: 'lightgreen',
              label: true,
              labelText: (item) => {
                return item.data!.path as string
              },
              labelBackground: true,
              labelBackgroundFill: 'darkgreen',
              labelOffsetY: 16,
              labelPlacement: 'top'
            }
          },
          layout: {
            type: 'combo-combined',
            comboPadding: 2,
          },
          behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element',
            {
              type: 'click-select',
              multiple: true,
              trigger: ['shift'],
              onClick: (e: IPointerEvent) => {
                //console.log(e)
                handleClickElement(e)
              }
             }
          ],
          plugins: plugins,
          autoFit: 'center'
        }}
      >
      </Graphin>
    </>
  )
}


