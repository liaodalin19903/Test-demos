
export const langs = [
  'C',
  'Lua',
  'JavaScript/Nodejs',
  'TypeScript',
  'Python',
  'Java',
  'Cpp',
  'Go',
  'Ruby',
  'PHP',
  'CSharp',
  'ObjectiveC',
  'Kotlin',
  'Rust',
  'Dart'
] as const;

export const CAINodeType = ['Class', 'AbstractClass', 'Interface'] as const;

export interface CAINode {
  type: typeof CAINodeType[number],
  cainame: string,
  path: string,  // 具体的文件
  lang:  typeof langs[number],  // 语言类型
  attrs?: string[],
  methods?: string[]
}

export type OutClassFunc = string  
export type CAIAttr = string  
export type CAIMethod = string  











