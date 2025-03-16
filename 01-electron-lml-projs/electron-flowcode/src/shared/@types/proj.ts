// 项目的软件设置

// 只保存一行数据
export interface ProjSettings {
  id?: number
  selectedNavMenuKey: string // 左侧栏nav menu选中的key
  created_time: string
  updated_time: string
}

export interface Proj {
  id?: number
  name: string
  desc?: string
  path: string
  isSelected: number
  created_time?: string
  updated_time?: string
}
