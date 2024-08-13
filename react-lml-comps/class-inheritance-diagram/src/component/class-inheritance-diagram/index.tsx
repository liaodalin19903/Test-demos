import React from 'react'


//#region 定义Props的Type
// eg. { age: 35 }
type PropertyDataType = {
  name: string,
  isFrom: ItemDataType,  // 从哪个类/抽象类/接口来的
  value: string | number |  undefined,  // 接口无实现 = undefined
}

type MethodDataType = {
  name: string, 
  isFrom: ItemDataType,
  value: string | undefined  // 接口无实现 = undefined
  isAbstract: boolean  // 是否是抽象方法
}

//#region 类接口之间的关系
type InheritanceRelationType = {
  name: 'inheritance',
  relationToId: ItemDataTypeId
}

type ImplementationRelationType = {
  name: 'implementation',
  relationToId: ItemDataTypeId
}

type AggregationRelationType = {
  name: 'aggregation',
  relationToId: ItemDataTypeId
}

type CompositionRelationType = {
  name: 'composition',
  relationToId: ItemDataTypeId
} 

type RelationType = InheritanceRelationType | ImplementationRelationType | AggregationRelationType | CompositionRelationType
//#endregion

type ItemDataTypeId = string | number

// 类数据类型: 类/抽象类/接口
export type ItemDataType = {
  id: ItemDataTypeId,
  type: 'Class' | 'AbstractClass' | 'Interface', 
  name: string, // 类名称
  properties: PropertyDataType[],  // 属性
  methods: MethodDataType[],
  relations: RelationType[]  // 与其他ItemDataType的关系
}

export type ClassInheritanceDiagramProps = {
  classDisplayType: 'Simple' | 'Full',  // 显示简单类 / 全量类
  data: ItemDataType[]  // 单个的数据（类/抽象类/接口）
}

//#endregion

export default function index(props: ClassInheritanceDiagramProps) {
  return (
    <div>index</div>
  )
}


