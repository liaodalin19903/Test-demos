

import { CAINode, CAIAttr, CAIMethod, OutClassFunc } from "@sma/shared-types";

export interface ASTNode {

    // 【目录】传入path目录, 获得所有的带有属性和方法的cai（class, abstract class, interface）节点
    getCAIs(path: string): CAINode[]

    // 【单个文件】传入AST节点, 获得类里面的属性数组
    getAttrs(cai: CAINode): CAIAttr[]

    // 【单个文件】传入path+类名, 获得类里面的方法数组
    getMethods(cai: CAINode): CAIMethod[]
}

export interface LangBase {
    //#region 
    // 获取类外:函数AST关键字
    getFuncASTWord(): string[] 

    // 获取类AST关键字
    getClassASTWord(): string[] 

    // 获取接口AST关键字
    getInterfaceASTWord(): string[]  

    // 获取类：属性的AST关键字
    getClassAttrASTWord(): string[]

    // 获取类：方法的AST关键字
    getClassMethodASTWord(): string[] 
    //#endregion
 
    /* 获取AST节点 */
    getClassASTNode(abpath: string):CAINode[] 

    getInterfaceASTNode(abpath: string):CAINode[] 

    getFuncASTNode(abpath: string):OutClassFunc[] 

}

