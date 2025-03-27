// 项目的软件设置

// 只保存一行数据
export interface ProjSettings {
  id?: number
  selectedNavMenuKey: string // 左侧栏nav menu选中的key
  editingFilePath? : string // 正在编辑的fc.json（路径）
  created_time?: string
  updated_time?: string
}

export interface Proj {
  id?: number
  projName: string
  desc?: string
  projPath: string  // 项目根目录
  codePath: string  // 项目代码目录
  isSelected: number
  created_time?: string
  updated_time?: string
}
