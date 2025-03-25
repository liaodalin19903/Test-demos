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

  const updateNode = useGraphStore((state) => state.updateNode);
  const updateEdge = useGraphStore((state) => state.updateEdge);


  useGraphEvent('cell:changed', (cell) => {
    //console.log('cell:changed', cell);
  })


  useGraphEvent('node:change:data', ({ node }) => {
  
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

  const onUndo = () => {

    if(canUndo) {
      console.log('canUndo')
      undo();
    }
    
  };

  const onRedo = () => {
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
