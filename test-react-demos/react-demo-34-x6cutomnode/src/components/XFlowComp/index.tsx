import { XFlow, XFlowGraph, Background, Control } from '@antv/xflow'
import React, { useState } from 'react'

import InitData from './InitData'

import './index.less'

export default function XFlowComp() {
  
  const controlOptions = {
    direction: 'horizontal' as const,
    placement: 'top' as const,
    items: ['zoomOut', 'zoomTo', 'zoomIn', 'zoomToFit', 'zoomToOrigin'] as (
      | 'zoomOut'
      | 'zoomTo'
      | 'zoomIn'
      | 'zoomToFit'
      | 'zoomToOrigin'
    )[],
  }
  
  return (
    
    
    <div className="xflow-container">
      <XFlow>
        <div className="xflow-control-content-graph">
          <InitData /> 
          <XFlowGraph />
          <Background color="#F2F7FA" />
        </div>
        
        <div style={{ position: 'absolute', right: 24, bottom: 24 }}>
          <Control
            items={controlOptions.items}
            direction={controlOptions.direction}
            placement={controlOptions.placement}
          />
        </div>

      </XFlow>
    </div>
    


  )
}
