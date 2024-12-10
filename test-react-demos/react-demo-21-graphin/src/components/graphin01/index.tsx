import React from 'react';
import { Graphin } from '@antv/graphin';
import { GraphData } from '@antv/g6'


const data: GraphData = {
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
}

export function Graphin01() {
  
  
  return (
    <Graphin
      id="my-graphin-demo"
      className="my-graphin-container"
      style={{ width: '100%', height: '100%', backgroundColor: 'yellowgreen' }}
      options={{
        autoResize: true,
        background: '#eee',
        data,
        node: {
          style: {
            labelText: (d) => d.id,
          },
          palette: {
            type: 'group',
            field: 'cluster',
          },
        },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
        animation: true,
      }}
    >
    </Graphin>
  );
}