

export namespace OOPLang {
  // 面向对象语言的通用功能: 用于语言的注册 【OOP语言共有】
  interface OOPLangCommonFeats {
    'class:inheritance': boolean,
    'class:abstract-class': boolean, // 抽象类
    'class:multi-inheritance': boolean,  // 多继承
    'class:combination': boolean,  // 组合
    'class:aggregation': boolean,  // 聚合
    'interface:interface-implement': boolean, // 接口是否支持. eg. Python就不支持接口（只有抽象类）
    'interface:interface-inheritance': boolean, // 继承接口
    'mixins:class': boolean,  // mixins - class  https://blog.csdn.net/weixin_44488811/article/details/139469573
  }

  // 面向对象语言的特殊功能: 用于语言的注册【特定语言特有】
  export interface OOPLangFeats {
    langName: string, // eg. Java
    commonFeats: OOPLangCommonFeats,
    specialFeats: string[]
  }
}


export namespace OOPLang {

  export interface OOPLanguageFuncInterface {

    /**
     * 获取项目下/获取文件下：所有类
     * @param path 可能是目录，也可能是文件
     */
    getClasses(path: string): [],

      // 获取指定类下面：所有属性和方法

      // 获取项目下：所有方法/函数名

      // 获取文件下：所有方法/函数名

      // 获取指定类的：继承链

      // 获取整个项目内所有文件的: 类的继承关系 

      // 上面哪些方法调用了此指定方法
      
      // 本方法调用了哪些子方法（如果没有调用其他子方法，那么自己就是基元方法）

    }
}

