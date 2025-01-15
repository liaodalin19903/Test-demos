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


import { NodeData, GraphData } from '@antv/g6'

import { SMAComboModuleWithCodefuncsAndEdge } from '@shared/@types'

// === 定义数据转换类

type DataTransformer<TInput, TOutput> = (input: TInput) => TOutput;

type DataTransformerMap = {
  'DataType1ToDataType2': DataTransformer<DataType1, DataType2>;
  'DataType2ToDataType3': DataTransformer<DataType2, DataType3>;
  // 后续添加更多转换关系时，相应添加类型定义
  'SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData': DataTransformer<SMAComboModuleWithCodefuncsAndEdge[], GraphData>;
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
  'SMAComboModuleWithCodefuncsAndEdgesToModuleGraphData': (smaComboModuleWithCodefuncsAndEdges: SMAComboModuleWithCodefuncsAndEdge[]): GraphData => {

    console.log('DC: ', smaComboModuleWithCodefuncsAndEdges)

    // 转换为GraphData


    return {}
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
