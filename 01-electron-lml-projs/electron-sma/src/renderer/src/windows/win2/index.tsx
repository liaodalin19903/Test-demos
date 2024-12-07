import React, { useEffect } from 'react';

import { subscribeWindowEvent, publishWindowEvent } from '@renderer/common/apis';

const Win2: React.FC = () => {

  useEffect(() => {
    console.log('win2 mounted') // 挂载后

    console.log('订阅事件')
    subscribeWindowEvent().subscribe(undefined, {
      onData: (data) => {
        console.log('接受数据')
        console.log(data);
      },

    });
  }, [])



  return <>
    <div>Hello from Win2</div>;

  </>
};

export default Win2;
