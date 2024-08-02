import React from 'react';

import './App.css';

import CodeBlockContainer from './component/code-blockcontainer'

function App() {

  const cb1 = () => {
    console.log('子组件完成执行')
  }

  return (
    <div className="App">
      <CodeBlockContainer data1="112233" cb1={cb1}></CodeBlockContainer>
    </div>
  );
}

export default App;
