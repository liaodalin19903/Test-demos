import React from 'react';

import './App.css';

import CodeSmallSquare from './components/code-smallsquare'

import FullItems, {FullItemsProps} from './components/code-smallsquare/subComp/full-items';

function App() {

/*

type FileItemType = {
  fileName: string, 
  className?: string | null, // 类名（所属）
  itemName: string, // 属性名 or 方法名
  selected?: boolean  
}
*/

  const props: FullItemsProps = {
    width: 400,
    items: [
      { fileName: 'src/aaa/bbb/ccc.ts', itemName: 'firstName' },
      { fileName: 'src/aaa/bbb/ccc.ts', itemName: 'firstName' },
      { fileName: 'src/aaa/bbb/ccc.ts', itemName: 'firstName' },
      { fileName: 'src/aaa/bbb/ccc.ts', itemName: 'firstName' },
      { fileName: 'src/aaa/bbb/ccc.ts', itemName: 'firstName' }
    ]
  }

  return (
    <div className="App">

      {/* <CodeSmallSquare></CodeSmallSquare> */}

      <FullItems {...props}></FullItems>
    </div>
  );
}

export default App;
