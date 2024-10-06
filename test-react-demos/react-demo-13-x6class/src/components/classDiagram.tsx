import { Cell, Graph,  ObjectExt } from '@antv/x6'
import React from 'react'
import { DagreLayout, CircularLayout } from "@antv/layout";

type Position = {
  "x": number,
  "y": number
}

type ClassDiagramItemID = string 

const nodeShapes = ['class'] as const 
const edgeShapes = [
  'extends',
  'composition',
  'implement',
  'aggregation',
  'association', 
] as const 

type ClassNodeItem = {
  id: ClassDiagramItemID,
  shape: typeof nodeShapes[number] 
  name: string[],
  attributes: string[],
  methods: string[],
  position: Position
} 

type ClassEdgeItem = {
  id: ClassDiagramItemID,
  shape: typeof edgeShapes[number]
  source: ClassDiagramItemID,
  target: ClassDiagramItemID,
  label?: string
}


type ClassDiagramItem = ClassNodeItem | ClassEdgeItem

export interface ClassDiagramProps  {
  items: ClassDiagramItem[]
}

export default class ClassDiagram extends React.Component {
  private container: HTMLDivElement | undefined 
  private graph: Graph | undefined  

  componentDidMount(): void {
    // #region 注册基础图形
    Graph.registerNode(
      'class',
      {
        inherit: 'rect',
        markup: [
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'rect',
            selector: 'name-rect',
          },
          {
            tagName: 'rect',
            selector: 'attrs-rect',
          },
          {
            tagName: 'rect',
            selector: 'methods-rect',
          },
          {
            tagName: 'text',
            selector: 'name-text',
          },
          {
            tagName: 'text',
            selector: 'attrs-text',
          },
          {
            tagName: 'text',
            selector: 'methods-text',
          },
        ],
        attrs: {
          rect: {
            width: 160,
          },
          body: {
            stroke: '#fff',
          },
          'name-rect': {
            fill: '#5f95ff',
            stroke: '#fff',
            strokeWidth: 0.5,
          },
          'attrs-rect': {
            fill: '#eff4ff',
            stroke: '#fff',
            strokeWidth: 0.5,
          },
          'methods-rect': {
            fill: '#eff4ff',
            stroke: '#fff',
            strokeWidth: 0.5,
          },
          'name-text': {
            ref: 'name-rect',
            refY: 0.5,
            refX: 0.5,
            textAnchor: 'middle',
            fontWeight: 'bold',
            fill: '#fff',
            fontSize: 12,
          },
          'attrs-text': {
            ref: 'attrs-rect',
            refY: 0.5,
            refX: 5,
            textAnchor: 'left',
            fill: 'black',
            fontSize: 10,
          },
          'methods-text': {
            ref: 'methods-rect',
            refY: 0.5,
            refX: 5,
            textAnchor: 'left',
            fill: 'black',
            fontSize: 10,
          },
        },
        propHooks(meta) {
          const { name, attributes, methods, ...others } = meta

          if (!(name && attributes && methods)) {
            return meta
          }

          const rects = [
            { type: 'name', text: name },
            { type: 'attrs', text: attributes },
            { type: 'methods', text: methods },
          ]

          let offsetY = 0
          rects.forEach((rect) => {
            const height = rect.text.length * 12 + 16
            ObjectExt.setByPath(
              others,
              `attrs/${rect.type}-text/text`,
              rect.text.join('\n'),
            )
            ObjectExt.setByPath(others, `attrs/${rect.type}-rect/height`, height)
            ObjectExt.setByPath(
              others,
              `attrs/${rect.type}-rect/transform`,
              'translate(0,' + offsetY + ')',
            )
            offsetY += height
          })

          others.size = { width: 160, height: offsetY }

          return others
        },
      },
      true,
    )

    // 继承
    Graph.registerEdge(
      'extends',
      {
        inherit: 'edge',
        attrs: {
          line: {
            strokeWidth: 1,
            targetMarker: {
              name: 'path',
              d: 'M 20 0 L 0 10 L 20 20 z',
              fill: 'white',
              offsetX: -10,
            },
          },
        },
      },
      true,
    )

    // 实现
    Graph.registerEdge(
      'implement',
      {
        inherit: 'edge',
        attrs: {
          line: {
            strokeWidth: 1,
            strokeDasharray: '3,3',
            targetMarker: {
              name: 'path',
              d: 'M 20 0 L 0 10 L 20 20 z',
              fill: 'white',
              offsetX: -10,
            },
          },
        },
      },
      true,
    )

    // 组合
    Graph.registerEdge(
      'composition',
      {
        inherit: 'edge',
        attrs: {
          line: {
            strokeWidth: 1,
            sourceMarker: {
              name: 'path',
              d: 'M 30 10 L 20 16 L 10 10 L 20 4 z',
              fill: 'black',
              offsetX: -10,
            },
            targetMarker: {
              name: 'path',
              d: 'M 6 10 L 18 4 C 14.3333 6 10.6667 8 7 10 L 18 16 z',
              fill: 'black',
              offsetX: -5,
            },
          },
        },
      },
      true,
    )

    // 聚合
    Graph.registerEdge(
      'aggregation',
      {
        inherit: 'edge',
        attrs: {
          line: {
            strokeWidth: 1,
            sourceMarker: {
              name: 'path',
              d: 'M 30 10 L 20 16 L 10 10 L 20 4 z',
              fill: 'white',
              offsetX: -10,
            },
            targetMarker: {
              name: 'path',
              d: 'M 6 10 L 18 4 C 14.3333 6 10.6667 8 7 10 L 18 16 z',
              fill: 'black',
              offsetX: -5,
            },
          },
        },
      },
      true,
    )

    // 关联
    Graph.registerEdge(
      'association',
      {
        inherit: 'edge',
        attrs: {
          line: {
            strokeWidth: 1,
            targetMarker: {
              name: 'path',
              d: 'M 6 10 L 18 4 C 14.3333 6 10.6667 8 7 10 L 18 16 z',
              fill: 'black',
              offsetX: -5,
            },
          },
        },
      },
      true,
    )
    // #endregion
    this.graph = new Graph({
      container: document.getElementById('container')!,
    })

    fetch('/data/class2.json').then((response) => response.json())
    .then((data) => {
      const cells: Cell[] = []
      const edgeShapes = [
        'extends',
        'composition',
        'implement',
        'aggregation',
        'association',
      ]
      data.forEach((item: ClassDiagramItem) => {
        if (edgeShapes.includes(item.shape)) {
          cells.push(this.graph!.createEdge(item))
        } else {
          cells.push(this.graph!.createNode(item))
        }
      })
      this.graph!.resetCells(cells)
      console.log('cells: ', cells)
      this.graph!.zoomToFit({ padding: 10, maxScale: 1 })

      // 对graph 执行dagre布局

      //const circularLayout = new CircularLayout({ radius: 10 });

      // const dagreLayout = new DagreLayout({
      //   type: 'dagre',
      //   rankdir: 'LR',
      //   align: 'UR',
      //   ranksep: 35,
      //   nodesep: 15,
      // })

      // const dagreLayout = {
      //   type: 'dagre',
      //   rankdir: 'LR',
      //   align: 'UR',
      //   ranksep: 35,
      //   nodesep: 15,
      // } as unknown as DagreLayout;

      
      // (async () => {
      //   // 1. Return positions of nodes & edges.
      //   const positions = await dagreLayout.execute(this.graph);
      
      //   // 2. To directly assign the positions to the nodes:
      //   await dagreLayout.assign(this.graph);
      // })();

    })

    // #region 给graph添加事件
    // this.graph.on('cell:click', ({ e, x, y, cell, view }) => {
    //   console.log('cell :', e, x, y, cell, view)
    // })
    this.graph.on('node:click', ({ e, x, y, node, view }) => {
      console.log('node: ', e, x, y, node, view)
    })
    this.graph.on('edge:click', ({ e, x, y, edge, view }) => {
      console.log('edge: ', e, x, y, edge, view)
    })
    this.graph.on('blank:click', ({ e, x, y }) => {
      console.log(e, x, y)
    })

    // #endregion

  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render(): React.ReactNode {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <div id='container'  
          style={{ width: '100vw', height: '100vh' }}
        ref={this.refContainer}></div>

        <button onClick={() => {
          console.log('toJSON数据: ', this.graph?.toJSON())
        }}>点击获取json数据</button>
      </div>
    )
  }
}

