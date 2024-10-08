

import { CAINode } from "../types";

export interface ASTNode {

    // 【目录】传入path目录, 获得所有的带有属性和方法的cai（class, abstract class, interface）节点
    getCAIs(path: string): CAINode[]

    // 【单个文件】传入path+类名, 获得类里面的属性数组

    // 【单个文件】传入path+类名, 获得类里面的方法数组


}


