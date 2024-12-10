
import { useRef } from 'react';
import { Graph } from './components/Graph'



const APP = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const graphOptions = {
    container: containerRef.current!,
    width: 500,
    height: 500,
    data: {
      nodes: [
        {
          id: 'node-1',
          style: { x: 50, y: 100 },
        },
        {
          id: 'node-2',
          style: { x: 150, y: 100 },
        },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
  }

  return (
    <>
        <Graph options={graphOptions}></Graph>
    </>
  )
};

export default APP 