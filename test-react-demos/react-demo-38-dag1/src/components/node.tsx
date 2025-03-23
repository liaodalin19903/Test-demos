import { useGraphStore, useClipboard, useKeyboard } from '@antv/xflow';
import { useCallback, useEffect } from 'react';

import { DAG_EDGE, DAG_EXEC_NODE, DAG_JUDGE_NODE } from './shape';

const InitShape = () => {
  const { copy, paste } = useClipboard();

  const addNodes = useGraphStore((state) => state.addNodes);
  const addEdges = useGraphStore((state) => state.addEdges);
  const updateNode = useGraphStore((state) => state.updateNode);
  const updateEdge = useGraphStore((state) => state.updateEdge);

  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  const removeNodes = useGraphStore((state) => state.removeNodes);
  const removeEdges = useGraphStore((state) => state.removeEdges);



  const initEdge = useCallback(() => {
    addEdges([
      {
        id: 'initEdge1',
        shape: DAG_EDGE,
        source: {
          cell: 'initNode1',
          port: 'initNode1-1',
        },
        target: {
          cell: 'initNode2',
          port: 'initNode2-1',
        },
        animated: true,
      },
      {
        id: 'initEdge2',
        shape: DAG_EDGE,
        source: {
          cell: 'initNode2',
          port: 'initNode2-2',
        },
        target: {
          cell: 'initNode3',
          port: 'initNode3-1',
        },
        animated: true,
      },
      {
        id: 'initEdge3',
        shape: DAG_EDGE,
        source: {
          cell: 'initNode2',
          port: 'initNode2-3',
        },
        target: {
          cell: 'initNode4',
          port: 'initNode4-1',
        },
        animated: true,
      },
    ]);
  }, [addEdges]);

  const addNodeInit = useCallback(() => {
    addNodes([
      {
        id: 'initNode1',
        shape: DAG_EXEC_NODE,
        x: 490,
        y: 200,
        data: {
          label: '执行节点',
          status: 'success',
        },
        ports: [
          {
            id: 'initNode1-1',
            group: 'bottom',
          },
        ],
      },
      {
        id: 'initNode2',
        shape: DAG_JUDGE_NODE,
        x: 490,
        y: 350,
        data: {
          label: '判断节点',
          status: 'running',
        },
        ports: [
          {
            id: 'initNode2-1',
            group: 'top',
          },
          {
            id: 'initNode2-2',
            group: 'bottom',
          },
          {
            id: 'initNode2-3',
            group: 'bottom',
          },
        ],
      },
      {
        id: 'initNode3',
        shape: DAG_EXEC_NODE,
        x: 320,
        y: 500,
        data: {
          label: '执行节点',
          status: 'running',
        },
        ports: [
          {
            id: 'initNode3-1',
            group: 'top',
          },
          {
            id: 'initNode3-2',
            group: 'bottom',
          },
        ],
      },
      {
        id: 'initNode4',
        shape: DAG_EXEC_NODE,
        x: 670,
        y: 500,
        data: {
          label: '执行节点',
          status: 'running',
        },
        ports: [
          {
            id: 'initNode4-1',
            group: 'top',
          },
          {
            id: 'initNode4-2',
            group: 'bottom',
          },
        ],
      },
    ]);
    setTimeout(() => {
      updateNode('initNode2', {
        data: {
          status: 'success',
        },
      });
      updateEdge('initEdge1', {
        animated: false,
      });
    }, 1000);
    setTimeout(() => {
      updateNode('initNode4', {
        data: {
          status: 'success',
        },
      });
      updateNode('initNode3', {
        data: {
          status: 'failed',
        },
      });
      updateEdge('initEdge2', {
        animated: false,
      });
      updateEdge('initEdge3', {
        animated: false,
      });
    }, 2000);
  }, [addNodes, updateNode, updateEdge]);

  const deleteItem = () => {
    // 删除node
    const selectedNodes = nodes.filter((node) => node.selected);
    const nodeIds: string[] = selectedNodes.map((node) => node.id).filter((id): id is string => typeof id === 'string'); // 过滤掉 undefined 值;
    removeNodes(nodeIds);

    // 删除edge
    const selectedEdges = edges.filter((edge) => edge.selected);
    const edgeIds: string[] = selectedEdges.map((edge) => edge.id);
    removeEdges(edgeIds);
  };

  useEffect(() => {
    addNodeInit();
    initEdge();
  }, [addNodeInit, initEdge]);

  const onCopy = () => {
    const selected = nodes.filter((node) => node.selected);
    const ids: string[] = selected.map((node) => node.id).filter((id): id is string => typeof id === 'string'); // 过滤掉 undefined 值;
    console.log(ids);
    copy(ids);
  };

  const onPaste = () => { 
    paste();
  };

  useKeyboard('meta+c', () => {
    console.log('cmd+c');
    onCopy();
  });

  useKeyboard('meta+v', () => {
    console.log('cmd+v');
    onPaste();
  });

  useKeyboard('backspace', () => {
    console.log('delete');
    deleteItem();
  });

  return null;
};

export { InitShape };
