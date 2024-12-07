import React, { useEffect } from 'react';

import { subscribeWindowEvent, publishWindowEvent } from '@renderer/common/apis';
import { Button } from 'antd';

import { WINDOW_EVENTS } from '@shared/constants';

const Win1: React.FC = () => {

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


  const publishEvent = () => {
    console.log('触发事件')
    publishWindowEvent(WINDOW_EVENTS[0])
  }

  // 定义一个简单的React组件
  return <>
    <div>Hello from Win1</div>
    <Button onClick={publishEvent}>publish event</Button>
  </>;
};

export default Win1;
