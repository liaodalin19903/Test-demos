import { PlayCircleOutlined, CopyOutlined } from '@ant-design/icons';
import type { Edge, NodeOptions, Node } from '@antv/xflow';
import {
  useGraphInstance,
  useClipboard,
  useGraphEvent,
  useGraphStore,
  useKeyboard,
  useHistory
} from '@antv/xflow';

import { Button, Space } from 'antd';


const Toolbar = () => {
  const graph = useGraphInstance();
  const { undo, redo, canUndo, canRedo } = useHistory();

  // const { copy, paste } = useClipboard();
  // const nodes = useGraphStore((state) => state.nodes);
  const updateNode = useGraphStore((state) => state.updateNode);
  const updateEdge = useGraphStore((state) => state.updateEdge);
  // const removeNodes = useGraphStore((state) => state.removeNodes);

  

  // useKeyboard('ctrl+c', () => onCopy());

  // useKeyboard('ctrl+v', () => onPaste());

  // useKeyboard('backspace', () => {
  //   const selected = nodes.filter((node) => node.selected);
  //   const ids: string[] = selected.map((node) => node.id || '');
  //   removeNodes(ids);
  // });

  useGraphEvent('cell:changed', (cell) => {
    //console.log('cell:changed', cell);
  })


  useGraphEvent('node:change:data', ({ node }) => {

    //console.log('node:change:data', node);

  
    if (graph) {
      const edges = graph.getIncomingEdges(node);
      const { status } = node.data;

      edges?.forEach((edge: Edge) => {
        if (status === 'running') {
          updateEdge(edge.id, {
            animated: true,
          });
        } else {
          updateEdge(edge.id, {
            animated: false,
          });
        }
      });
    }

  });

  const handleExecute = () => {
    if (graph) {
      nodes.forEach((node: Node | NodeOptions, index: number) => {
        const edges = graph.getOutgoingEdges(node as Node);
        updateNode(node.id!, {
          data: {
            ...node.data,
            status: 'running',
          },
        });

        setTimeout(() => {
          updateNode(node.id!, {
            data: {
              ...node.data,
              status: edges
                ? 'success'
                : Number(node.id!.slice(-1)) % 2 !== 0
                ? 'success'
                : 'failed',
            },
          });
        }, 1000 * index + 1);
      });
    }
  };

  // const onCopy = () => {
  //   const selected = nodes.filter((node) => node.selected);
  //   const ids: string[] = selected.map((node) => node.id || '');
  //   copy(ids);
  // };

  // const onPaste = () => {
  //   paste();
  // };

  const onUndo = () => {
    console.log('点击撤销')

    console.log(canUndo,canRedo)  // 一直是false，不管怎么修改node的title和移动位置
    if(canUndo) {
      console.log('canUndo')
      undo();
    }
    
  };

  const onRedo = () => {
    console.log('点击重做')
    if(canRedo) {
      console.log('canRedo')
      redo();
    }
  }

  return (
    <Space>
      <Button
        type="primary"
        size="small"
        style={{ fontSize: 12 }}
        onClick={handleExecute}
      >
        <PlayCircleOutlined />
        全部执行
      </Button>
      <Button type="primary" size="small" style={{ fontSize: 12 }} onClick={onUndo}>
        <CopyOutlined />
        撤销
      </Button>
      <Button type="primary" size="small" style={{ fontSize: 12 }} onClick={onRedo}>
        <CopyOutlined />
        重做
      </Button>
    </Space>
  );
};

export { Toolbar };
