// 1、计算排列布局  入参：给定一个 ClassInheritanceDiagramProps.data 的数组数据，计算出每个节点.node的position，并且返回为X6/class类图所需的 （如何排列比较合理）
import { ItemDataType }  from '../index'

// 数据处理器
class DataProcessor {

    readonly itemList = <ItemDataType[]>[]

    constructor(itemList: ItemDataType[] ) {
        this.itemList = itemList
    }

    // 生成向上继承链
    getInheritanceChain() {
        // TODO: 需要一种算法
    }
}


export {
    DataProcessor
}
