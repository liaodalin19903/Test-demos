type DataType1 = {
  name: string;
  age: number;
};

type DataType2 = {
  name: string;
  age: number;
  data: unknown;
};

type DataType3 = {
  name: string;
  age: number;
  data: unknown;
  data2: unknown;
};


import { NodeData, GraphData, EdgeData, ComboData } from '@antv/g6'

import { SMAComboModuleWithCodefuncsAndEdges } from '@shared/@types'

// === 定义数据转换类

type DataTransformer<TInput, TOutput> = (input: TInput) => TOutput;

type DataTransformerMap = {
  'DataType1ToDataType2': DataTransformer<DataType1, DataType2>;
  'DataType2ToDataType3': DataTransformer<DataType2, DataType3>;
  // 后续添加更多转换关系时，相应添加类型定义
  'SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData': DataTransformer<SMAComboModuleWithCodefuncsAndEdges, GraphData>;
};

const dataTransformers: DataTransformerMap = {
  'DataType1ToDataType2': (d1: DataType1): DataType2 => {
    const d2: DataType2 = {
      ...d1,
      data: undefined,
    };
    return d2;
  },
  'DataType2ToDataType3': (d2: DataType2): DataType3 => {
    const d3: DataType3 = {
      ...d2,
      data2: undefined,
    };
    return d3;
  },
  // 继续添加更多类型转换函数
  'SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData': (smaComboModuleWithCodefuncsAndEdges: SMAComboModuleWithCodefuncsAndEdges): GraphData => {

    //console.log('DC: ', smaComboModuleWithCodefuncsAndEdges)

    // 转换为GraphData
    const graphData: GraphData = { nodes: [], edges: [], combos: [] };

    // 处理 modules 为 combos
    smaComboModuleWithCodefuncsAndEdges.modules.forEach(module => {
      const comboData: ComboData = {
        id: `SMAComboModule-${module.id}`,
        data: {
          moduleName: module.moduleName,
          desc: module.desc,
          path: module.path,
          isDeleted: module.isDeleted,
          createDate: module.createDate,
          updateDate: module.updateDate
        }
      };
      graphData.combos?.push(comboData);


      // 处理 codeFuncs 为 nodes
      module.codeFuncs?.forEach(codeFunc => {
        const nodeData: NodeData = {
          id: `SMANodeCodeFunc-${codeFunc.id}`,
          combo: `SMAComboModule-${module.id}`,
          data: {
            path: codeFunc.path,
            codefuncName: codeFunc.codefuncName,
            desc: codeFunc.desc,
            isDeleted: codeFunc.isDeleted,
            createDate: codeFunc.createDate,
            updateDate: codeFunc.updateDate
          }
        };
        graphData.nodes?.push(nodeData);
      });
    });


    // 处理 codefuncEdges 为 edges
    smaComboModuleWithCodefuncsAndEdges.codefuncEdges.forEach(edge => {
      const edgeData: EdgeData = {
        id: edge.id!.toString(),
        source: `SMANodeCodeFunc-${edge.source}`,
        target: `SMANodeCodeFunc-${edge.target}`
      };
      graphData.edges?.push(edgeData);
    });


    return graphData;

  }

};

// 定义 Converter 类
export class DataConverter {
  static transformData<T extends keyof DataTransformerMap>(
    type: T,
    input: Parameters<DataTransformerMap[T]>[0]
  ): ReturnType<DataTransformerMap[T]> {
    //@ts-ignore
    return dataTransformers[type](input);
  }
}
// 示例用法

// const result1 = DataConverter.transformData('DataType1ToDataType2', { name: 'Alice', age: 30 });
// const result2 = DataConverter.transformData('DataType2ToDataType3', { name: 'Alice', age: 30, data: 'data' });
// console.log(result1, result2);
