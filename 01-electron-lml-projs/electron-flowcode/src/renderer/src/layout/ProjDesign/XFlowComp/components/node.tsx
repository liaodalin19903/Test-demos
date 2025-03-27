import { useGraphStore, useClipboard, useKeyboard, useGraphEvent } from '@antv/xflow';
import { useCallback, useEffect, useState } from 'react';
import { _ } from 'lodash'
import { useEditingFilePathChange, useEditingFilePath } from './hooks/useEditingFilePath';
import { db } from '@renderer/common/dexieDB';
import { readJsonFileApi, saveJsonFileApi } from '@renderer/common/apis/dirApi'; // 导入 readJsonFileApi

interface InputDataType {
  name: string;  // 输入变量名称
  typeOrPath: string;  // ①内置数据类型（string）或 ②自定义数据类型路径（path）
  customTypeName?: string;  // 自定义数据类型名称
  desc?: string;
}

interface OutputDataType {
  typeOrPath: string;  // ①内置数据类型（string）或 ②自定义数据类型路径（path）
  customTypeName?: string;  // 自定义数据类型名称
  desc?: string;
}

interface UnittestType {
  path: string;  // 单元测试路径
  name: string;  // 单元测试名称
  passed: boolean;
  desc?: string;
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

  const initData = useGraphStore((state) => state.initData);
  const addNodes = useGraphStore((state) => state.addNodes);
  const addEdges = useGraphStore((state) => state.addEdges);
  const updateNode = useGraphStore((state) => state.updateNode);
  const updateEdge = useGraphStore((state) => state.updateEdge);

  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);

  const removeNodes = useGraphStore((state) => state.removeNodes);
  const removeEdges = useGraphStore((state) => state.removeEdges);

  const [initNodes, setInitNodes] = useState<ExecStepNodeType[]>([]);
  const [initEdges, setInitEdges] = useState<any[]>([]);

  const editingFilePath = useEditingFilePath() as string

  const loadInitialData = async (filePath: string | undefined) => {
    //console.log('loadInitialData: ', filePath)
    if (!filePath) return;


    try {
      const data = await readJsonFileApi(filePath);

      initData(
        {
          nodes: data.nodes ?? [],
          edges: data.edges ?? []
        }
      )

    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  const initEdge = useCallback(() => {
    addEdges(initEdges);
  }, [addEdges, initEdges]);

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
  }, [addNodes, updateNode, updateEdge, initNodes, initEdges]);

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
    const fetchSettings = async () => {
      const settings = await db.projSettings.toArray();
      if (settings.length > 0) {
        const editingFilePath = settings[0].editingFilePath;
        if (editingFilePath) {
          loadInitialData(editingFilePath);
        }
      }
    };

    fetchSettings();
  }, []);

  const handleFilePathChange = (newPath: string | undefined) => {
    if (newPath) {
      console.log('editingFilePath 发生了变化:', newPath);
      loadInitialData(newPath);
    }
  };

  // 编辑中的json 文件路径变化时，重新加载数据
  useEditingFilePathChange(handleFilePathChange);

  useEffect(() => {
    if (initNodes && initNodes.length > 0) {
      console.log('initNodes and initEdges updated, adding nodes and edges');
      addNodeInit();
      initEdge();
    }
  }, [addNodeInit, initEdge, initNodes, initEdges]);

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


  const handleSaveFcJson = async () => {

    const FcJsondata = {
      nodes: nodes,
      edges: edges
    }

    await saveJsonFileApi(
      editingFilePath,
      FcJsondata
    )
  }

  const throttledHandleSaveFcJson = _.throttle(handleSaveFcJson, 1500)

  useGraphEvent('cell:changed', (cell) => {
    throttledHandleSaveFcJson()
  })

  return null;
};

export { InitShape };
