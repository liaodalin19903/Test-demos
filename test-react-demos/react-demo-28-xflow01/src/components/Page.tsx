import { XFlow, XFlowGraph, Grid, Background, Snapline, Minimap } from '@antv/xflow'
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
        <XFlowGraph zoomable minScale={0.5} />
        <Grid type="dot" options={{ color: '#ccc', thickness: 1 }} />
        <Background color="#F2F7FA" />
        <Snapline sharp />
        <InitNode />
      </XFlow>
    </div>
  )
}

export default Page