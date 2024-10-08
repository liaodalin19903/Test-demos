

export interface CAINode {
    type: 'Class' | 'AbstractClass' | 'Interface',
    cainame: string,
    path: string,  // 具体的文件
    range: [number, number],  // 定义的范围(起止line)
    lang: string,  // 语言类型
    attrs?: string[],
    methods?: string[]
}
