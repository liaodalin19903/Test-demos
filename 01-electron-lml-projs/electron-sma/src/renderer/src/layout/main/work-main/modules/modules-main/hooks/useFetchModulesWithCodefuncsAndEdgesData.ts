
import { GraphData } from '@antv/g6'
import {useSMAModulesStore, useProjStore } from '@renderer/common/store'
import { useEffect } from 'react'

import { SMAComboModule } from '@shared/db-entities/SMACombos';


/*
GraphOptions里面的GraphData
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
  ],
  edges: [],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    type: 'rect',
    style: {
      padding: 20,
    },
  },
  behaviors: ['drag-element', 'collapse-expand'],
});

graph.render();

*/

// 准备图数据(modules)
export const useFetchModulesWithCodefuncsAndEdgesData = () => {

  // 步骤1：①查询出modules, ②modules 里面的代码块, ③代码块之间的edges
  const {
    fetchModulesWithCodefuncsAndEdges,
    } = useSMAModulesStore()

  const { selectedProjMod }  = useProjStore()

  useEffect(() => {

    const asyncFunc = async () => {
      selectedProjMod && await fetchModulesWithCodefuncsAndEdges(selectedProjMod.id)
    }
    asyncFunc()
  }, [selectedProjMod])


}



