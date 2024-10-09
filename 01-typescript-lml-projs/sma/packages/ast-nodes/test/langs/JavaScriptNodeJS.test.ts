
import { JavaScriptNodeJS } from "../../src/langs/JavaScriptNodeJS";

import { getAbFilePath } from "../../src/utils";

import { it, expect, describe } from 'vitest'

const js = new JavaScriptNodeJS()
const fileAbPath = getAbFilePath('../../test/data/testdata.js')

describe('测试获取AST节点', () => {

  it('获取类AST节点', () => {
    // 获取类AST节点
    const classASTNodes = js.getClassASTNode(fileAbPath)
    expect(classASTNodes.length).toBe(1)
  })

  it('获取接口AST节点', () => {
    const interfaceASTNodes = js.getInterfaceASTNode(fileAbPath)
    expect(interfaceASTNodes).toStrictEqual([])
  })

  it('获取类外函数AST节点', () => {
    const funcASTNodes = js.getFuncASTNode(fileAbPath)
    expect(funcASTNodes.length).toBe(3)
  })
})

describe('测试类AST节点的细节', () => {
  it('获取类AST节点的range', () => {
    const classASTNodes = js.getClassASTNode(fileAbPath)
    console.log(classASTNodes[0].range)
    expect(classASTNodes[0].range).toBe([0, 100])
  })
})
