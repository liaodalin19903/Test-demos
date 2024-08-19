// NTSGWType = node-tree-sitter-grammar-wrapper-type

export = NTSWrapTypes

// CID = class-inheritiance-diagram
declare namespace NTSWrapTypes {
  //#region 
  // eg. { age: 35 }
  type PropertyDataType = {
    name: string,
    isFrom: CAIDataType,  // 从哪个类/抽象类/接口来的
    value: string | number |  undefined,  // 接口无实现 = undefined
  }

  type MethodDataType = {
    name: string, 
    isFrom: CAIDataType,
    value: string | undefined  // 接口无实现 = undefined
    isAbstract: boolean  // 是否是抽象方法
  }

  //#region 类接口之间的关系
  type InheritanceRelationType = {
    name: 'inheritance',
    relationToId: CAIDataTypeId
  }

  type ImplementationRelationType = {
    name: 'implementation',
    relationToId: CAIDataTypeId
  }

  type AggregationRelationType = {
    name: 'aggregation',
    relationToId: CAIDataTypeId
  }

  type CompositionRelationType = {
    name: 'composition',
    relationToId: CAIDataTypeId
  } 

  type RelationType = InheritanceRelationType | ImplementationRelationType | AggregationRelationType | CompositionRelationType
  //#endregion

  type CAIDataTypeId = string | number

  // 类数据类型: 类/抽象类/接口（CAI = Class AbstractClass Interface ）
  export type CAIDataType = {
    id: CAIDataTypeId,
    type: 'Class' | 'AbstractClass' | 'Interface', 
    name: string, // 类名称
    properties: PropertyDataType[],  // 属性
    methods: MethodDataType[],
    relations: RelationType[]  // 与其他CAIDataType的关系
  }

  
  //#endregion
}



