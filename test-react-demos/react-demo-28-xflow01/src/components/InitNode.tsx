// src/components/InitNode.tsx
import { useGraphStore, useClipboard, useKeyboard } from '@antv/xflow';
import { useEffect, useCallback } from 'react';

export const InitNode = () => {
  const { copy, paste } = useClipboard();

  const addNodes = useGraphStore((state) => state.addNodes);
  const addEdges = useGraphStore((state) => state.addEdges);

  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  const initData = useGraphStore((state) => state.initData);
  const removeNodes = useGraphStore((state) => state.removeNodes);
  const removeEdges = useGraphStore((state) => state.removeEdges);

  const deleteItem = () => {
    // 删除node
    const selectedNodes = nodes.filter((node) => node.selected);
    const nodeIds: string[] = selectedNodes.map((node) => node.id);
    removeNodes(nodeIds);

    // 删除edge
    const selectedEdges = edges.filter((edge) => edge.selected);
    const edgeIds: string[] = selectedEdges.map((edge) => edge.id);
    removeEdges(edgeIds);
  };

  const setInitData = useCallback(() => {
    initData({
      nodes: [
        {
          id: '1',
          x: 32,
          y: 32,
          width: 100,
          height: 40,
          label: 'Hello',
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
              rx: 6,
              ry: 6,
            },
          },
          selected: false, // 初始化为 false
        },
        {
          id: '2',
          shape: 'circle',
          x: 160,
          y: 180,
          width: 60,
          height: 60,
          label: 'World',
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
          selected: false, // 初始化为 false
        },
        {
          id: '3',
          x: 200,
          y: 100,
          width: 100,
          height: 40,
          label: 'Drag Me',
          attrs: {
            body: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
              rx: 6,
              ry: 6,
            },
          },
          selected: false, // 初始化为 false
        },
      ],
      edges: [
        {
          id: 'e1',
          source: '1',
          target: '2',
          attrs: {
            line: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
            },
          },
          selected: false, // 初始化为 false
        },
      ],
    });
  }, [initData]);

  useEffect(() => {
    setInitData();
  }, [setInitData]);

  const onCopy = () => {
    const selected = nodes.filter((node) => node.selected);
    const ids: string[] = selected.map((node) => node.id);
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