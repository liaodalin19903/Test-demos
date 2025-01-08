import { GraphData } from '@antv/g6';
import { register, ExtensionCategory } from '@antv/g6';
import './App.css'
import { Graphin } from '@antv/graphin';
import { useEffect, useState } from 'react';

import { SMAModulesCombo } from './g6CustomElements/smaModulesCombo';

function App() {

  const [data, setData] = useState<GraphData>({})

  useEffect( () => {

    // 注册Combo
    register(ExtensionCategory.COMBO, 'sma-modules-combo', SMAModulesCombo);

    // 获取数据 
    async function fetchData() {
      // You can await here
      const data:GraphData = await handle()
      setData(data)
    }
    fetchData();
    
  }, [])

  const handle = async(): Promise<GraphData> => {
    console.log('begin')
    const data = await fetch('data/data1.json')
    console.log('after begin')
    return data.json() 
  }

  return (
  <>
    <Graphin
      id="my-graphin-demo"
      className="my-graphin-container"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#eee' }}
      options={{
        data,
        node: {
          type: 'rect',
          style: {
            labelText: (d) => d.id + 'asdabdsf123',
            ports: [],
            size: 10,
          },

        },
        // edge: {
        //   type: 'polyline',
        //     style: {
        //       lineWidth: 3,
        //       radius: 6,
        //       stroke: '#8b9baf',
        //       endArrow: true,
        //       labelText: '支撑',
        //       labelFill: '#8b9baf',
        //       labelFontWeight: 600,
        //       labelBackground: true,
        //       labelBackgroundFill: '#f8f8f8',
        //       labelBackgroundOpacity: 1,
        //       labelBackgroundLineWidth: 3,
        //       labelBackgroundStroke: '#8b9baf',
        //       labelPadding: [1, 10],
        //       labelBackgroundRadius: 4,
        //       router: {
        //         type: 'orth',
        //       },
        //     },
        // },
        combo: {
          // type: 'sma-modules-combo',

          type: 'rect',
          style: {
            fill: 'darkgreen',
            labelText: 'data'
          }
        },
        layout: {
          type: 'combo-combined',
          comboPadding: 20,
        },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element', 'click-select', 'collapse-expand'],
        padding: 10,
        autoFit: "view"
      }}
    >
    </Graphin>
  </>
  )
}

export default App
