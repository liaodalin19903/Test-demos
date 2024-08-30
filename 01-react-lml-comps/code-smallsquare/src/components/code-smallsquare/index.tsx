import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

export default function Index() {

  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '相1：全量方格',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '相2：顶级方格',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: '相3：依据文件排列',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </div>
  )
}
