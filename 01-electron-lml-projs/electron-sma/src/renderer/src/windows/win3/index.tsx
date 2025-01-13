import { EVENTS } from '@shared/constants';
import React, { useEffect } from 'react';

const Win3: React.FC = () => {

  useEffect(() => {
    console.log('win3 mounted') // 挂载后

    console.log('订阅事件')

    window.api.onEvent(EVENTS.EVENT_WINDOW_UPDATE_DATA, (event, data) => {
      console.log('收到事件', event, data)
    })

  }, [])

  return <div>Hello from Win3</div>; // 定义一个简单的React组件
};

export default Win3;
