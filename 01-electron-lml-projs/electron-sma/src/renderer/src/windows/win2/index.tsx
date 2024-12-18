import React, { useEffect } from 'react';

import { WINDOW_EVENTS } from '@shared/constants';

const Win2: React.FC = () => {

  useEffect(() => {
    console.log('win2 mounted') // 挂载后

    console.log('订阅事件')

    window.api.onEvent(WINDOW_EVENTS.EVENT_WINDOW_UPDATE_DATA, (event, data) => {
      console.log('收到事件', event, data)
    })

  }, [])

  return <>
    <div>Hello from Win2</div>;

  </>
};

export default Win2;
