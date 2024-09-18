import { Cell, Graph,  ObjectExt } from '@antv/x6'
import React from 'react'

type Position = {
  "x": number,
  "y": number
}

type ClassDiagramItemID = string 

type ClassDiagramItem = {
  id: ClassDiagramItemID,
  shape: 'class'    // 注意：CAI 都是使用shape: class
  | 'extends' | 'composition' | 'implements' | 'aggregation' | 'association',
  source?: ClassDiagramItemID,
  target?: ClassDiagramItemID,
  label?: string,  
  name: string[],
  attributes: string[],
  methods: string[],
  position: Position
}

export interface ClassDiagramProps  {
  items: ClassDiagramItem[]
}

// export default function ClassComp(props: ClassDiagramProps) {
//   return (
//     <div>ClassComp</div>
//   )
// }

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

    fetch('/data/class.json').then((response) => response.json())
    .then((data) => {

      console.log('lml: ', this.graph, this.container)
      console.log('lml-data: ', data)

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
    })
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
        </div>
      )
  }
}

