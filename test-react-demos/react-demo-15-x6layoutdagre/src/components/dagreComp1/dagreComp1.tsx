import React from 'react'

import { Graph, Model } from '@antv/x6'
import { DagreLayout } from '@antv/layout'


export default function dagreComp1() {

  //#region 准备数据
  const data: Model.FromJSONData = {
    nodes: [],
    edges: [],
  }

  const edges = [
    ['1', '2'],
    ['2', '3'],
    ['2', '4'],
    ['4', '5'],
    ['4', '6'],
    ['4', '7'],
    ['4', '8'],
    ['5', '9'],
    ['6', '10'],
    ['7', '11'],
    ['8', '12'],
  ]
  
  for (let i = 1; i <= 12; i++) {
    data.nodes!.push({
      id: `${i}`,
      shape: 'circle',
      width: 32,
      height: 32,
      label: i,
      attrs: {
        body: {
          fill: '#5F95FF',
          stroke: 'transparent',
        },
        label: {
          fill: '#ffffff',
        },
      },
    })
  }
  
  edges.forEach((edge: string[]) => {
    data.edges!.push({
      source: edge[0],
      target: edge[1],
      attrs: {
        line: {
          stroke: '#A2B1C3',
          strokeWidth: 2,
        },
      },
    })
  })
  
  //#endregion
  
  //#region 做一个model
  const dagreLayout = new DagreLayout({
    type: 'dagre',
    rankdir: 'LR',
    align: 'UR',
    ranksep: 35,
    nodesep: 15,
  })



  const model = dagreLayout.layout(data)
  //#endregion


  return (
    <div>dagreComp1</div>
  )
}
