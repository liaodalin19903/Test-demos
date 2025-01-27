import { GraphData } from '@antv/g6';
import './App.css'
import { Graphin } from '@antv/graphin';

import { data } from './data /data'

function App() {

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
            size: [60, 30],
            radius: 8,
            labelText: (d) => d.id,
            labelBackground: true,
            ports: [{ placement: 'top' }, { placement: 'bottom' }],
          },
          
        },
        edge: {
          type: 'polyline',
          style: {
            router: {
              type: 'orth',
              endArrow: true,
            },
          },
        },
        combo: {
          type: 'rect',
          style: {
            radius: 8,
            labelText: (d) => d.id,
          },
        },
        layout: {
          type: 'antv-dagre',
          ranksep: 50,
          nodesep: 5,
          sortByCombo: true,
        },
        behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas',],
      }}
    >
    </Graphin>
  </>
  )
}

export default App
