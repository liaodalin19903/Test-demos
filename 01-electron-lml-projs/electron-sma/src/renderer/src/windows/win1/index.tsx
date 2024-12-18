import React, { useEffect } from 'react';

import { publishEvent } from '@renderer/common/apis';
import { Button } from 'antd';

import { WINDOW_EVENTS, WINDOW_NAMES } from '@shared/constants';


const Win1: React.FC = () => {

  useEffect(() => {

    console.log('win2 mounted') // 挂载后

    console.log('订阅事件')

  }, [])


  const handleClick = () => {
    console.log('触发事件')
    publishEvent([WINDOW_NAMES.WIN2, WINDOW_NAMES.WIN3], WINDOW_EVENTS.EVENT_WINDOW_UPDATE_DATA, {
      comesFrom: WINDOW_NAMES.WIN1
    })

  }

  // 定义一个简单的React组件
  return <>
    <div>Hello from Win1</div>
    <Button onClick={handleClick}>publish event</Button>
  </>;
};

export default Win1;
