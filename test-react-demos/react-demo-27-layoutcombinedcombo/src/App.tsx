
import './App.css'

import { Graphin } from '@antv/graphin'

import { data } from './common/data'

function App() {

  

  return (
    <>
      <Graphin
        id="my-graphin-demo"
        className="my-graphin-container"
        style={{ width: '100vw', height: '100vh', backgroundColor: '#eee' }}
        options={{
          data,
          layout: {
            type: 'combo-combined',
            comboPadding: 2,
          },
          node: {
            style: {
              size: 20,
              labelText: (d) => d.id,
            },
          },
          combo: {
            type: 'rect'
          },
          behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
          autoFit: 'view',
        }}
      >
      </Graphin>
    </>
    )
}

export default App
