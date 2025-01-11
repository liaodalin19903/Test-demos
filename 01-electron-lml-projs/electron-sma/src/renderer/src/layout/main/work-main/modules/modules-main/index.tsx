// 封装一个Graphin图

import { GraphData } from '@antv/g6';
import { Graphin } from '@antv/graphin';


import React, { useEffect } from 'react'
import { useGetGraphData } from './hooks/useGetGraphData';

export default function ModulesMain() {

  const data = useGetGraphData()

  useEffect(() => {
    console.log('modules-main:data ', data)
  }, [])

  return (
    <div>ModulesMain</div>
  )
}


