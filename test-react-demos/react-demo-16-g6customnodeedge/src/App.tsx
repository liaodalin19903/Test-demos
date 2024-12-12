
import { Graphin } from '@antv/graphin';

import ReactNode01, { ReactNode01Data } from './components/ReactNode01'
import { GraphOptions } from '@antv/g6';


const APP = () => {

  const handleNodeChange = (url: string) => {
    console.log('回调url：', url)
  }
  
  const graphOptions: GraphOptions = {
    data: {
      nodes: [
        {
          id: 'local-server-1',
          data: { status: 'success', type: 'local', url: 'http://localhost:3000' },
          style: { x: 50, y: 50 },
        },
        {
          id: 'remote-server-1',
          data: { status: 'warning', type: 'remote' },
          style: { x: 350, y: 50 },
        },
      ],
      edges: [{ id: 'edge-1', source: 'local-server-1', target: 'remote-server-1' }],
    },
    node: {
      type: 'react',
      style: {
        component: (data: ReactNode01Data) => <ReactNode01 data={data} onChange={handleNodeChange}/>,
      }
    },
    behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
  }

  return (
      <Graphin 
        style={{ backgroundColor: '#eee', width: '100vw', height: 'vh' }}
        options={graphOptions}
      ></Graphin>
  )
};

export default APP 