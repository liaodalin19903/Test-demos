import './App.css'

import { FlowcodeStepCollapsibleProps } from './components/FlowcodeStepCollapsible'
import FlowcodeStepCollapsible from './components/FlowcodeStepCollapsible'

// 完整的测试数据
const props: FlowcodeStepCollapsibleProps = {
  id: 'step-1',
  onEdit: (id: string, newData: FlowcodeStepCollapsibleProps) => {
    console.log('编辑回调:', id, newData);
  },
  onDelete: (id: string) => {
    console.log('删除回调:', id);
  },
  func: {
    funcpath: 'src/functions/calculate.js',
    funcname: 'calculateTotal',
    funcdesc: '计算订单总金额的方法'
  },
  inputs: [
    {
      inputname: 'items',
      inputdesc: '商品列表',
      inputpathOrType: '/Users/markleo/Downloads'
    },
    {
      inputname: 'discount',
      inputdesc: '折扣率',
      inputpathOrType: 'number'
    }
  ],
  output: {
    outputname: 'total',
    outputdesc: '订单总金额',
    outputpathOrType: 'number'
  },
  unittests: [
    {
      unittestpath: 'tests/unit/calculate.test.ts',
      unittestname: '正常订单计算',
      unittestdesc: '包含多个商品和折扣的测试用例',
      passed: true
    },
    {
      unittestpath: 'tests/unit/calculate.test.ts',
      unittestname: '空订单测试',
      passed: true
    }
  ]
};

function App() {

  return (
    <>
      <FlowcodeStepCollapsible {...props}></FlowcodeStepCollapsible>
    </>
  )
}

export default App
