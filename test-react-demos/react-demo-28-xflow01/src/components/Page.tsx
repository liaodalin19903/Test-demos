import { 
  XFlow, 
  XFlowGraph,
  Grid, 
  Background, Snapline, Minimap, Control,
  Clipboard,
  useGraphInstance
  //Stencil,
  //Scroller 
} from '@antv/xflow'
import React, { useState } from 'react'
import { InitNode } from './InitNode'
import './index.less'

const Page = () => {

  const instance = useGraphInstance()

  const [options] = useState({
    simple: true,
    simpleNodeBackground: 'red',
    width: 200,
    height: 160,
    padding: 10,
  })

  const saveData = () => {
    console.log('saveData')
    const jsonData = instance?.toJSON()
    console.log('jsonData: ', jsonData)
  }

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
        <Clipboard/>
        <InitNode />
        
        <div style={{ position: 'absolute', right: 24, bottom: 24 }}>
          <Control
            items={['zoomOut', 'zoomTo', 'zoomIn', 'zoomToFit', 'zoomToOrigin']}
          />
        </div>

        <div style={{ position: 'absolute', right: 24, bottom: 72 }}>
          <Minimap simple={false} />
        </div>
        <button onClick={saveData}>点击保存数据</button>
      </XFlow>

      
    </div>
  )
}

export default Page