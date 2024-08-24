

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

