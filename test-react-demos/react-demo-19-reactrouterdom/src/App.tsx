
import './App.css'

import React from 'react';
//import { Tag } from 'antd';
import MyTag from './MyTag';
import MyButton from './MyButton';

const App: React.FC = () => {

  const clickHandle = () => {
    console.log('button clicked.')
  }

  return (
  <>
    <MyTag onClick={() => {
      console.log(112233)
    }}>Tag 1</MyTag>

    <MyButton onClick={clickHandle}>按钮</MyButton>
  </>
  )
  
};

export default App;
