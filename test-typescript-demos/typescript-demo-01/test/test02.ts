

type DataType1 = {
  name: string,
  age: number 
}

type DataType2 = {
  name: string,
  age: number,
  data: unknown 
}

type DataType3 = {
  name: string,
  age: number,
  data: unknown 
}


// === 定义数据转换类

type DataTransformer<TInput, TOutput> = (input: TInput) => TOutput;


type DataTransformerMap = {
  'DataType1ToDataType2': DataTransformer<DataType1, DataType2>;
  'DataType2ToDataType3': DataTransformer<DataType2, DataType3>;
  // 后续添加更多转换关系时，相应添加类型定义
};

const dataTransformers: DataTransformerMap = {
  'DataType1ToDataType2': (d1: DataType1): DataType2 => {
      const d2: DataType2 = {
         ...d1,
          // 根据实际情况补充或修改属性
      };
      return d2;
  },
  'DataType2ToDataType3': (d2: DataType2): DataType3 => {
      const d3: DataType3 = {
         ...d2,
          // 相应的转换逻辑
      };
      return d3;
  },
  // 继续添加更多类型转换函数
};

class DataConverter {
  transformData<T extends keyof typeof dataTransformers>(
      input: Parameters<typeof dataTransformers[T]>[0]
  ): ReturnType<typeof dataTransformers[T]> {
      return dataTransformers[T](input);
  }
}

// === 实际使用

const converter = new DataConverter();
const d1: DataType1 = {
  name: "",
  age: 0
};
const d2 = converter.transformData<"DataType1ToDataType2">(d1);
console.log(d2)