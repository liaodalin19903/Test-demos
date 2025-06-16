import { Tabs } from 'antd';
import React from 'react'

import intro from './pages/intro'
import dayunLiunian from './pages/dayunLiunian'
import calResult from './pages/cal_result'

const tabs = [
  { label: '基本信息', component: intro },
  { label: '大运流年', component: dayunLiunian },
  { label: '计算结果', component: calResult }
]

export default function index() {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        style={{ marginBottom: 32 }}
        items={tabs.map((tab, i) => {
          const id = String(i + 1);
          return {
            label: tab.label,
            key: id,
            children: <tab.component />
          };
        })}
      />
    </div>
  )
}
