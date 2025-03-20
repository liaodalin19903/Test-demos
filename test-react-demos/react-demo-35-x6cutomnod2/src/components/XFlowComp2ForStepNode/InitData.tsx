import { useGraphStore } from '@antv/xflow'
import React, { useEffect, useCallback } from 'react'

import { FlowcodeStepCollapsibleDataType } from '../nodes/FlowcodeStepCollapsible';

const testData: FlowcodeStepCollapsibleDataType = {
  id: 'step-1',
  func: {
    funcpath: 'src/functions/calculate.js',
    funcname: 'calculateTotal',
    funcdesc: '计算订单总金额的方法'
  },
  inputs: [
    {
      inputname: 'items',
      inputdesc: '商品列表',
      inputpathOrType: '/Users/markleo/Downloads'
    },
    {
      inputname: 'discount',
      inputdesc: '折扣率',
      inputpathOrType: 'number'
    }
  ],
  output: {
    outputname: 'total',
    outputdesc: '订单总金额',
    outputpathOrType: 'number'
  },
  unittests: [
    {
      unittestpath: 'tests/unit/calculate.test.ts',
      unittestname: '正常订单计算',
      unittestdesc: '包含多个商品和折扣的测试用例',
      passed: true
    },
    {
      unittestpath: 'tests/unit/calculate.test.ts',
      unittestname: '空订单测试',
      passed: false
    }
  ]
};


export default function InitData() {
  
  const initData = useGraphStore((state) => state.initData)
  const setInitData = useCallback(() => {
    initData({
      nodes: [
        {
          id: '1',
          shape: 'custom-react-node',
          x: 32,
          y: 32,
          width: 420,
          height: 80,
          label: 'Hello',
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
              rx: 6,
              ry: 6,
            },
          },
          data: testData
        },
        {
          id: '2',
          shape: 'circle',
          x: 160,
          y: 180,
          width: 60,
          height: 60,
          label: 'World',
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
          attrs: {
            line: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
            },
          },
        },
      ],
    })
  }, [initData])
  
  useEffect(() => {
    setInitData()
  }, [setInitData])

  return (
    null 
  )
}
