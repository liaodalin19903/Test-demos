
import { JavaScriptNodeJS } from "../../src/langs/JavaScriptNodeJS";

import { getAbFilePath } from "../../src/utils";

const js = new JavaScriptNodeJS()

// 获取类AST节点
//console.log('绝对路径: ', getAbFilePath('../data/testdata.js'))
const classASTNodes = js.getClassASTNode(getAbFilePath('../../test/data/testdata.js'))
//console.log(classASTNodes)
classASTNodes.forEach(node => {
  console.log(node)
})


// // 获取接口AST节点
// const interfaceASTNodes = js.getInterfaceASTNode(getAbFilePath('../data/testdata.js'))
// console.log(interfaceASTNodes)

// // 获取函数AST节点
// const funcASTNodes = js.getFuncASTNode(getAbFilePath('../data/testdata.js'))
// console.log(funcASTNodes)

// // 获取类属性AST节点
// const classAttrASTNodes = js.getCAIAttrASTNode(classASTNodes[0])
// console.log(classAttrASTNodes)

// // 获取类方法AST节点
// const classMethodASTNodes = js.getCAIMethodASTNode(classASTNodes[0])
// console.log(classMethodASTNodes)

