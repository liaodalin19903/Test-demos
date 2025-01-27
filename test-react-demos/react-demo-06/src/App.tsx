import React, { createContext, useEffect } from 'react';

import './App.css';
import { of } from 'rxjs';
import { useObservable } from 'dexie-react-hooks'
import { concatMap, delay } from 'rxjs/operators';

function App() {


  // 创建一个发出 1, 2, 3 的 Observable
  const source = of(1, 2, 3);

  // 让每个值依次延迟一定时间后发出
  const delayedSource = source.pipe(
      concatMap(value => of(value).pipe(delay( 1000)))
  );
  // // 订阅Observable并处理发出的值
  // delayedSource.subscribe(value => {
  //     console.log(new Date().toISOString(), value);
  // });

  //const value = useObservable(delayedSource)

  useEffect(() => {
    

  }, [])

  return (
    <>
    112233

    value: {value}
    </>
  );
}

export default App;
