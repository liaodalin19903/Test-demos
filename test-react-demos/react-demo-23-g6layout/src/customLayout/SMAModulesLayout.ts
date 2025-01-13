import { BaseLayout } from '@antv/g6';
import type { GraphData, ComboData, NodeData, Combo } from '@antv/g6';

// combo嵌套的树状结构  目的：用于计算
interface ComboDataTree extends ComboData {
  children: ComboDataTree[];
}

const styleOpt = {
  nodePadding: 10,  // combo内nodes之间的padding
  comboPadding: 20  // combo之间的padding
}

/**
 * 将扁平的combos转为树状数据结构
 * 目的：①方便找到顶层的combo ②方便进行计算宽高，进而布局
 * @param combos 
 * @returns 
 */
const combosToTree = (combos: ComboData[]): ComboDataTree[] => {
  const map: { [key: string]: ComboDataTree } = {};
  const roots: ComboDataTree[] = [];

  // 将每个 combo 存入 map，以便快速查找
  combos.forEach(combo => {
      map[combo.id] = { ...combo, children: [] } as ComboDataTree;
  });

  // 构建树
  combos.forEach(combo => {
      if (combo.combo) {
          // 如果有父 combo，添加到父 combo 的 children 中
          map[combo.combo].children.push(map[combo.id]);
      } else {
          // 如果没有父 combo，说明是顶层 combo
          roots.push(map[combo.id]);
      }
  });

  return roots;
}

/**
 * 通过combo 找到属于本combo的nodes
 * @param combo 
 * @returns 
 */
const getNodesByCombo = (combo: ComboData, nodes: NodeData[]): NodeData[] => {
    const result: NodeData[] = [];
    const comboId = combo.id;

    const findNodesByComboId = (node: NodeData): void => {
        if (node.combo === comboId) {
            result.push(node);
        }
        const childrenIds = node.children || [];
        const childNodes = nodes.filter(n => childrenIds.includes(n.id));
        for (const childNode of childNodes) {
            findNodesByComboId(childNode);
        }
    };

    for (const node of nodes) {
        findNodesByComboId(node);
    }

    return result;
};


const doLayout = (inData: GraphData): GraphData=> {
  
  const outData: GraphData = {
    combos: [],
    nodes: []
  }

  return outData 
}

class SMAModulesLayout extends BaseLayout {
  id = 'sma-modules-layout'

  async execute(data: GraphData): Promise<GraphData> {
    const layoutedData = doLayout(data)
    return layoutedData
  }
}

export default SMAModulesLayout 

