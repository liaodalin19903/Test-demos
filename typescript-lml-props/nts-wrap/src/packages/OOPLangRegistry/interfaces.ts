

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
    specialFeats: string[],
    qs: OOPLangQuerySyntaxs
  }
  
  // 可在playground探索出：https://tree-sitter.github.io/tree-sitter/playground 
  export interface OOPLangQuerySyntaxs {
    //#region CAI names
    /**
     * eg. TypeScript语言匹配出类名
     * (class_declaration
          name: (type_identifier) @class-name
          )
     */
    classNameQS: string,
    abstractClassNameQS: string,
    interfaceNameQS: string,

    //#endregion

    //#region properties & methods 没有抽象属性
    // 抽象方法sign （遍历Node的时候判断）
    abstract_method_signature: string, 
    abstract_method_name: string,  // eg. property_identifier
    // 方法
    method_definition: string,  // 整个方法定义
    method_name: string,  // eg. property_identifier

    // 属性
    property_definition: string, // 整个属性定义. eg. public_field_definition
    property_name: string // eg. property_identifier

    //#endregion


  }
  
}

