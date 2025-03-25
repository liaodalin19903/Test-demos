import { useGraphStore, useClipboard, useKeyboard } from '@antv/xflow';
import { useCallback, useEffect } from 'react';

import { DAG_EDGE, DAG_EXEC_NODE, DAG_JUDGE_NODE } from './shape';


interface InputDataType {
  name: string,  // 输入变量名称
  typeOrPath: string,  // ①内置数据类型（string）或 ②自定义数据类型路径（path）
  customTypeName?: string,  // 自定义数据类型名称
  desc?: string,
}

interface OutputDataType {
  typeOrPath: string,  // ①内置数据类型（string）或 ②自定义数据类型路径（path）
  customTypeName?: string,  // 自定义数据类型名称
  desc?: string,
}

interface UnittestType {
  path: string,  // 单元测试路径
  name: string,  // 单元测试名称
  passed: boolean,
  desc?: string,
}

export interface ExecStepNodeDataType {
  label: string,
  status: 'success' | 'failed' | 'running',
  desc?: string,
  inputs: InputDataType[],
  output: OutputDataType | undefined,
  unittests: UnittestType[]
}


// 定义端口类型
interface PortType {
  id: string;
  group: string;
}

export interface ExecStepNodeType {
  id: string;
  shape?: string;
  x?: number;
  y?: number;
  data: ExecStepNodeDataType;
  ports?: PortType[];
}

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

  const initNodes: ExecStepNodeType[] = [
    {
      id: 'initNode1',
      shape: DAG_EXEC_NODE,
      x: 490,
      y: 200,
      data: {
        label: '执行节点',
        status: 'failed',
        inputs: [
          {
            name: 'input1',
            typeOrPath: 'string',
            desc: '输入变量1',
          },
          {
            name: 'input2',
            typeOrPath: 'string',
            desc: '输入变量2',
          },
        ],
        output: {
          typeOrPath: 'string',
          desc: '输出变量',
        },
        unittests: [
          {
            path: 'test/test1.py',
            name: 'test1',
            passed: true,
            desc: '测试用例1',
          },
          {
            path: 'test/test2.py',
            name: 'test2',
            passed: false,
          }
        ]
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
        status: 'success',
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
        status: 'failed',
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
        status: 'failed',
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
  ]

  const initEdges = [
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
  ]


  const initEdge = useCallback(() => {
    addEdges(initEdges);
  }, [addEdges]);

  const addNodeInit = useCallback(() => {

    addNodes(initNodes);

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
