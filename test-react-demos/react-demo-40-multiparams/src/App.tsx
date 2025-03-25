import './App.css'
import MultiParamComp from './components/MultiParamComp'

import { ExecStepNodeDataType } from './components/MultiParamComp'
const App = () => {
  const data: ExecStepNodeDataType = {
    label: '执行节点',
    status: 'success',
    desc: '描述信息',
    inputs: [
      {
        name: 'input1',
        typeOrPath: 'string',
        desc: '输入变量1',
      },
      {
        name: 'input2',
        typeOrPath: 'string',
        desc: '输入变量2',
      },
    ],
    output: {
      typeOrPath: 'string',
      desc: '输出变量',
    },
    unittests: [
      {
        path: 'test/test1.py',
        name: 'test1',
        passed: true,
        desc: '测试用例1',
      },
      {
        path: 'test/test2.py',
        name: 'test2',
        passed: false,
      }
    ]
  };

  const handleDataChange = (updatedData: ExecStepNodeDataType) => {
    console.log('Updated Data:', updatedData);
  };

  return (
    <>
      <MultiParamComp data={data} onDataChange={handleDataChange} />
    </>
  );
}

export default App;