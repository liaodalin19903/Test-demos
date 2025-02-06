import { 
  XFlow, 
  XFlowGraph,
  Grid, 
  Background, Snapline, Minimap, Control,
  //Stencil,
  //Scroller 
} from '@antv/xflow'
import React, { useState } from 'react'
import { InitNode } from './InitNode'
import './index.less'

const Page = () => {


  const [options] = useState({
    simple: true,
    simpleNodeBackground: 'red',
    width: 200,
    height: 160,
    padding: 10,
  })

  return (
    <div className="xflow-guide">
      <XFlow>
        <XFlowGraph 
          minScale={0.5} 
          embedable
          pannable
          scroller
          />
        <Grid type="dot" options={{ color: '#ccc', thickness: 1 }} />
        <Background color="#F2F7FA" />
        <Snapline sharp />
        <InitNode />
        
        <div style={{ position: 'absolute', right: 24, bottom: 24 }}>
          <Control
            items={['zoomOut', 'zoomTo', 'zoomIn', 'zoomToFit', 'zoomToOrigin']}
          />
        </div>

        <div style={{ position: 'absolute', right: 24, bottom: 72 }}>
          <Minimap simple={false} />
        </div>
      </XFlow>
    </div>
  )
}

export default Page