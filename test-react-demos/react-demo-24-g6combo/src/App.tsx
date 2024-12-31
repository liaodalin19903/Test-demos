import { GraphData } from '@antv/g6';
import './App.css'
import { Graphin } from '@antv/graphin';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState<GraphData>({})

  useEffect( () => {

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
          style: {
            labelText: (d) => d.id,
            ports: [],
          },
          palette: {
            type: 'group',
            field: 'cluster',
          },
        },
        combo: {
          type: 'rect'
        },
        layout: {
          //type: 'force',
          type: 'combo-combined',
          // collide: {
          //   strength: 0.5,
          // },
          
          comboPadding: 10,
        },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element', 'click-select'],
        padding: 10,
        autoFit: "view"
      }}
    >
    </Graphin>
  </>
  )
}

export default App
