// import path from 'path'
// import fs from 'fs'


/**
 * 定义类型interface
 */
interface ClassType {
  classname: string, 
  method
}


interface OOPLanguageFuncInterface {

  /**
   * 获取项目下/获取文件下：所有类
   * @param path 可能是目录，也可能是文件
   */
  getClasses(path: string): 


  // 获取指定类下面：所有属性和方法

  // 获取项目下：所有方法/函数名

  // 获取文件下：所有方法/函数名

  // 获取指定类的：继承链

  // 获取整个项目内所有文件的: 类的继承关系 

  // 上面哪些方法调用了此指定方法
  
  // 本方法调用了哪些子方法（如果没有调用其他子方法，那么自己就是基元方法）
}