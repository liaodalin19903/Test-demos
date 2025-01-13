type DataType1 = {
  name: string;
  age: number;
};

type DataType2 = {
  name: string;
  age: number;
  data: unknown;
};

import { NodeData } from '@antv/g6'

// === 定义数据转换类

type DataTransformer<TInput, TOutput> = (input: TInput) => TOutput;

type DataTransformerMap = {
  'DataType1ToDataType2': DataTransformer<DataType1, DataType2>;
  // 后续添加更多转换关系时，相应添加类型定义
  //''
};

const dataTransformers: DataTransformerMap = {
  'DataType1ToDataType2': (d1: DataType1): DataType2 => {
    const d2: DataType2 = {
      ...d1,
      data: undefined,
    };
    return d2;
  },
  // 继续添加更多类型转换函数
};

class DataConverter {
  transformData<T extends keyof DataTransformerMap>(
    type: T,
    input: Parameters<DataTransformerMap[T]>[0]
  ): ReturnType<DataTransformerMap[T]> {
    return dataTransformers[type](input) as ReturnType<DataTransformerMap[T]>; // 使用类型断言
  }
}

// 示例用法
const converter = new DataConverter();
const result = converter.transformData('DataType1ToDataType2', { name: 'Alice', age: 30 });
console.log(result);
