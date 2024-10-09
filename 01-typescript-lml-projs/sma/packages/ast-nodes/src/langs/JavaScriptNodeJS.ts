import { CAINode, CAIAttr, CAIMethod, OutClassFunc, CAINodeType, langs } from '@sma/shared-types';
import { LangBase } from '../interfaces'
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');

export class JavaScriptNodeJS implements LangBase {

  //#region 获取AST关键字
  getFuncASTWord(): string[] {
    return ['function_declaration', 'arrow_function']
  }
  getClassASTWord(): string[] {
    return ['class_declaration']
  }

  // [] 代表没有接口定义
  getInterfaceASTWord(): string[] {
    return [] 
  }
  getClassAttrASTWord(): string[] {
    return ['field_definition']
  }
  getClassMethodASTWord(): string[] {
    return ['method_definition', 'arrow_function']
  }

  //#endregion

   // 私有 traverse 方法
   private traverse(node, classNodes: CAINode[], word: string) {
    if (node.type === word) { // 使用 this.getClassASTWord()
      classNodes.push(node); // 如果是类声明，添加到数组
    }
    for (let i = 0; i < node.namedChildCount; i++) {
      this.traverse(node.namedChildren[i], classNodes, word); // 递归遍历子节点
    }
  }

  // 封装获取属性名称的方法
  private getAttributeNames(node): string[] {
    const attrNames: string[] = [];

    const tmpAttrNames: CAINode[] = [];
    // 遍历节点的子节点
    this.traverse(node, tmpAttrNames, this.getClassAttrASTWord()[0]);
    //console.log("lml-tmpAttrNames:", tmpAttrNames)

    // 将 tmpAttrNames 转换为属性名（字符串）
    tmpAttrNames.forEach(attrNode => {
      // 查找属性名称节点
      // @ts-ignore
      const attrNameNode = attrNode.namedChildren.find(child => child.type === 'property_identifier');
      if (attrNameNode) {
        attrNames.push(attrNameNode.text); // 添加属性名称到数组
      }
    });

    return attrNames; // 返回所有属性名称
  }

  // 封装获取方法名称的方法
  private getMethodNames(node): string[] {
    const methodNames: string[] = [];

    const tmpMethodsNames: CAINode[] = [];
    this.traverse(node, tmpMethodsNames, this.getClassMethodASTWord()[0]);

    //console.log("lml-tmpMethodsNames:", tmpMethodsNames)

    // 将 tmpAttrNames 转换为属性名（字符串）
    tmpMethodsNames.forEach(attrNode => {
      // 查找属性名称节点
      // @ts-ignore
      const attrNameNode = attrNode.namedChildren.find(child => child.type === 'property_identifier');
      if (attrNameNode) {
        methodNames.push(attrNameNode.text); // 添加属性名称到数组
      }
    });

    return methodNames; // 返回所有方法名称
  }

  /* 获取AST节点 */
  /**
   * 
   * @param path 绝对路径. 使用 getAbFilePath 获取
   */
  getClassASTNode(abpath: string): CAINode[] {
    const sourceCode = require('fs').readFileSync(abpath, 'utf8'); // 读取文件内容
    const parser = new Parser();
    parser.setLanguage(JavaScript); // 设置语言为 JavaScript
    const tree = parser.parse(sourceCode); // 解析源代码

    const classNodes: CAINode[] = []; // 存储类节点的数组

    // 将 traverse 定义为类的方法
    this.traverse(tree.rootNode, classNodes, this.getClassASTWord()[0]); // 从根节点开始遍历
    
    // 将 classNodes 转换为 CAINode 类型
    const CAINodes: CAINode[] = classNodes.map(node => {
      // 查找类名节点
      // @ts-ignore
      const classNameNode = node.namedChildren.find(child => child.type === 'identifier');

      //console.log("lml-node:", node.startPosition, node.endPosition)

      // 返回数据  
      return {
        type: CAINodeType[0],
        // @ts-ignore
        cainame: classNameNode ? classNameNode.text : node.text, // 使用类名节点的文本，如果不存在，则使用当前节点的文本
        path: abpath,
        lang: langs[2],
        // @ts-ignore
        range: [node.startPosition, node.endPosition], // 填充 range
        attrs: this.getAttributeNames(node),//attrs, // 填充 attrs
        methods: this.getMethodNames(node) // 填充 methods
      }
    });
    return CAINodes; // 返回所有类节点
  }

  getInterfaceASTNode(abpath: string): CAINode[] {
    return [] // JavaScript 没有接口
  }

  getFuncASTNode(abpath: string): OutClassFunc[] {
    const sourceCode = require('fs').readFileSync(abpath, 'utf8'); // 读取文件内容
    const parser = new Parser();
    parser.setLanguage(JavaScript); // 设置语言为 JavaScript
    const tree = parser.parse(sourceCode); // 解析源代码

    const funcNodes: OutClassFunc[] = []; // 存储函数节点的数组

    // 私有 traverse 方法
    const traverse = (node) => {
        if (node.type === 'function_declaration' ) { // 检查节点类型是否为函数声明或箭头函数
            const funcNameNode = node.namedChildren.find(child => child.type === 'identifier'); // 查找函数名称节点
            const funcNode: OutClassFunc = funcNameNode ? funcNameNode.text : ''
            funcNodes.push(funcNode); // 将函数节点添加到数组
        }else if(node.type === 'arrow_function'){
            const funcNameNode = node.namedChildren.find(child => child.type === 'identifier'); // 查找函数名称节点
            const funcNode: OutClassFunc = funcNameNode ? funcNameNode.text : ''
            funcNodes.push(funcNode); // 将函数节点添加到数组
        }
        for (let i = 0; i < node.namedChildCount; i++) {
            traverse(node.namedChildren[i]); // 递归遍历子节点
        }
    };

    traverse(tree.rootNode); // 从根节点开始遍历
    return funcNodes; // 返回所有函数节点
  }
  
}

