
/**
 * 
 */


type PositionInFile = {
  filePath: string, // 源代码文件的path
  line: number,  // 所在文件行
  start: number, // 一行开始的位置
  end: number    // 一行结束的位置
}

// 定义CAI（类/抽象类/接口）的唯一性识别
export interface CAIBase {
  readonly position: PositionInFile // 在文件的位置
  readonly id: string  // 基于position计算出的id（hash一下）
  constractor(): void  // 初始化：position、id 

}

export interface CAIInheritChainData {
  cai:CAIBase,
  children: CAIInheritChainData[]
}

export type propertyType = {
  position: PositionInFile,
  accessModifier: string,   // 访问修饰符
  propertyName: string,
  value: any 
}

export type methodType = {
  position: PositionInFile,
  accessModifier: string,   // 访问修饰符
  methodName: string,
  body: any // 代码的body
}


// method向下调用链
export type callMethodOnEarth = {
  method: methodType,
  children: callMethodOnEarth[]
}

// 面向对象语言常用的AST封装方法
export interface OOPLanAstCommonFunc {
  langName: string | undefined  // 注册的语言中的name的选择

  /**
   * 获取项目下/获取文件下：所有类
   * @param path 可能是目录，也可能是文件
   */
  getClasses(path: string): CAIBase[],

  // 获取指定类下面：所有属性
  getProperties(cai: CAIBase): propertyType[]

  // 获取指定类下面：所有方法
  getMethods(cai: CAIBase): methodType[]

  // 获取项目下：所有方法/函数名
  getMethods(path: string): methodType[]

  // 获取文件下：所有方法/函数名  (langName: 是否给出指定语言名，否则使用默认自己的langName)
  getMethods(path: string, langName?:string): methodType[]

  // 获取指定类的：向上继承链 （最基础的数据是本CAI实例）
  getCAIInheritChain(cai: CAIBase): CAIInheritChainData

  // 获取整个项目内所有文件的/指定文件的: 类的继承关系  
  getCAIInheritChain(path: string): CAIInheritChainData[]

  // 本方法上面哪些方法调用了本方法
  getBeCalledMethods(method: methodType): methodType[] 
  
  // 本方法【调用链】调用了哪些子方法（如果没有调用其他子方法，那么自己就是基元方法）
  getCallOtherMethods(method: methodType): callMethodOnEarth
}


