import React, { useState } from 'react';

import './App.css';

import CodeBlockContainer from './component/code-blockcontainer'
import { SubContainerProps, ItemType } from './component/code-blockcontainer/subContainer'



import SubContainer from './component/code-blockcontainer/subContainer'


function App() {
  
  const props:SubContainerProps = {
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
      { type: 'method', value: 'getFullname', selected: true },
    ],
    height: 120,
    title: 'classA'
  }

  
  return (
    <div className="App">
      
      <SubContainer {...props}></SubContainer>
    </div>
  );
}

export default App;
