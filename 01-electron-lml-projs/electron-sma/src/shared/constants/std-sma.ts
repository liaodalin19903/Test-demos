// 标准化：G6 Graph 需要的设定
// 标准化定义：https://boardmix.cn/app/share?token=CAE.CMbf_wsgASoQto0gKE8w4hP6jIyWnQLe4zAFQAE&otherNodeGuid=77:7
// 标准化定义：https://www.yuque.com/markemotionact/txyhqy/rqmetn4m86mbi9zr


export enum SMA_COLOR {
  REQUIREMENT_COLOR = '#ea3526',
  API_COLOR = '#c1f0df',
  CODE_COLOR = '#f4fbfe',
  MODULE_COLOR = '#8fb65f',
  CAI_COLOR = '#fbf3ad',
  DATATYPE = '#e7e7e7'
}


// ===

// SMA edge 类型
export enum SMA_EDGE_TYPE {
  COMMON_SUPPORT = '通用:支撑',
  CAI_INHERIT = 'CAI:继承',
  CAI_IMPLEMENT = 'CAI:实现'
}

export enum SMA_COMBO_TYPE {
  MODULESGRAPH_MODULE = '模块图:模块',
  AGGREGATION_FUNCCODE = '聚合:功能代码'  // 功能同类型的代码：聚合
}
