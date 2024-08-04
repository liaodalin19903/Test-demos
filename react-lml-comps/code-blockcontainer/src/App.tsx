import React, { useState } from 'react';

import './App.css';

import CodeBlockContainer, {CodeBlockContainerProps} from './component/code-blockcontainer'

import { SubContainerProps, ItemType } from './component/code-blockcontainer/subContainer'
import SubContainer from './component/code-blockcontainer/subContainer'


function App() {

  // 滚动位置
  // const [selIdx, setSelIdx] = useState<number>(0)
  
  // const props:SubContainerProps = {
  //   data: [
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'property', value: 'firstName' },
  //     { type: 'property', value: 'lastName' },
  //     { type: 'method', value: 'getFullname', selected: true },
  //   ],
  //   height: 120,
  //   title: 'classA',
  //   selected: true,
  //   scrollToIdx: selIdx
  // }

  const btnClick = () => {
    console.log('点击按钮')
    // setSelIdx(20)
  }

  const props: CodeBlockContainerProps = {
    data: [
      {
        title: 'classA',
        data: [
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'method', value: 'getFullname', selected: true },
        ]
      },
      {
        title: 'classA',
        data: [
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'method', value: 'getFullname', selected: true },
        ]
      },
      {
        title: 'classA',
        data: [
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'property', value: 'firstName' },
          { type: 'property', value: 'lastName' },
          { type: 'method', value: 'getFullname', selected: true },
        ]
      }
    ],
    title: 'aaa/bbb/ccc.tsx',
    width: 400,
  }

  return (
    <div className="App">
      
      {/* <SubContainer {...props}></SubContainer> */}
      <CodeBlockContainer {...props}></CodeBlockContainer>

      <button onClick={btnClick}>点击</button>
    </div>
  );
}

export default App;


